const { check } = require("express-validator");
const usersRepo = require("../../repositories/users");

module.exports = {
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
   requireConfirmPassword: check("passwordconfirmation")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters")
      .custom((passwordconfirmation, { req }) => {
         if (req.body.password !== passwordconfirmation) {
            throw new Error("Password do not match");
         }
      }),
};