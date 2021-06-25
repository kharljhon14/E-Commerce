const layout = require("../layout");
const { getError } = require("../../helper");

module.exports = ({ errors }) => {
   return layout({
      content: `
    <div>
        <form method="post">
            <input type="text" name="email" placeholder="email"/>
            ${getError(errors, "email")}
            <input type="password" name="password" placeholder="password"/>
            ${getError(errors, "password")}
            <button >Sign In </button>
        </form>
    </div>
    `,
   });
};
