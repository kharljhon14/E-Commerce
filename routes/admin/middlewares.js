const { validationResult } = require("express-validator");

module.exports = {
  handleError(templateFunc, dataCallback) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      console.log(errors);
      if (!errors.isEmpty()) {
        let data = {};
        if (dataCallback) {
          data = await dataCallback(req);
        }
        return res.send(templateFunc({ errors, ...data }));
      }
      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userid) return res.redirect("/signin");

    next();
  },
};
