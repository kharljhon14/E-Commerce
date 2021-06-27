const express = require("express");

const { handleError } = require("./middlewares");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {
  requireEmail,
  requirePassword,
  requireConfirmPassword,
  requireValidPasswordFor,
  requireExistingEmail,
} = require("./validators");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requireConfirmPassword],
  handleError(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;

    //Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });

    //Store the id of that user inside the users cookie
    req.session.userid = user.id; //Added by cookie session

    res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.redirect("/signup");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signin",
  [requireExistingEmail, requireValidPasswordFor],
  handleError(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    const user = await usersRepo.getOneBy({ email });

    req.session.userid = user.id;

    res.redirect("/admin/products");
  }
);

module.exports = router;
