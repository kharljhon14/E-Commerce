const { check } = require("express-validator");
const usersRepo = require("../../repositories/users");

module.exports = {
   requireTitle: check("title").trim().isLength({ min: 3, max: 40 }).withMessage("Must be between 3 and 40 characters"),
   requirePrice: check("price").trim().toFloat().isFloat({ min: 1 }).withMessage("Must be a number greater than 1"),
   requireEmail: check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must be a valid email")
      .custom(async (email) => {
         const existingUser = await usersRepo.getOneBy({ email });
         if (existingUser) {
            throw new Error("Email is in use");
         }
      }),
   requirePassword: check("password").trim().isLength({ min: 4, max: 20 }).withMessage("Must be between 4 and 20 characters"),
   requireConfirmPassword: check("passwordConfirmation")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters")
      .custom((passwordconfirmation, { req }) => {
         if (req.body.password !== passwordconfirmation) {
            throw new Error("Password do not match");
         } else return true;
      }),
   requireExistingEmail: check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must be a valid email")
      .custom(async (email) => {
         const user = await usersRepo.getOneBy({ email });
         if (!user) {
            throw new Error("Email not found");
         }
      }),
   requireValidPasswordFor: check("password")
      .trim()
      .custom(async (password, { req }) => {
         const user = await usersRepo.getOneBy({ email: req.body.email });
         if (!user) throw new Error("Invalid Password");
         const validPassword = await usersRepo.comparePasswords(user.password, password);
         if (!validPassword) throw new Error("Invalid Password");
      }),
};
