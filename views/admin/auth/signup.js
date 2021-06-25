const layout = require("../layout");
const { getError } = require("../../helper");

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
