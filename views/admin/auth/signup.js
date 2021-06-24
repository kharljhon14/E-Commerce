module.exports = ({ req }) => {
   return `
    <div>
    ${req.session.userid}
    <form method="post">
    <input type="text" name="email" placeholder="email"/>
    <input type="password" name="password" placeholder="password"/>
    <input type="password" name="passwordconfirmation" placeholder="confirm password"/>
    <button >Sign Up </button>
    </form>
    </div>
    `;
};
