const layout = require("../layout");

// Helper Function
const getError = (errors, propertyName) => {
   try {
      //errors is an array
      //mapped is to return the array as an object
      return errors.mapped()[propertyName].msg;
   } catch (err) {
      return "";
   }
};

module.exports = ({ req, errors }) => {
   return layout({
      content: `
    <div>
        ${req.session.userid}
        <form method="post">
            <input type="text" name="email" placeholder="email"/>
            ${getError(errors, "email")}
            <input type="password" name="password" placeholder="password"/>
            ${getError(errors, "password")}
            <input type="password" name="passwordconfirmation" placeholder="confirm password"/>
            ${getError(errors, "passwordconfirmation")}
            <button >Sign Up </button>
        </form>
    </div>
    `,
   });
};
