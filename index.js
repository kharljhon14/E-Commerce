const { urlencoded } = require("express");
const express = require("express");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

const app = express();

//MiddleWares
app.use(urlencoded({ extended: true }));
app.use(
   cookieSession({
      keys: ["asd2323ffs"],
   })
);

app.use(authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Listing for port ${PORT}`);
});
