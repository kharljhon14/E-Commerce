const { urlencoded } = require("express");
const express = require("express");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/admin/auth");
const productsRouter = require("./routes/admin/products");

const app = express();

//MiddleWares
//Check in the current directory and find the "Public" folder and make everything inside the folder available to the outside world
app.use(express.static("public"));

app.use(urlencoded({ extended: true }));
app.use(
   cookieSession({
      keys: ["asd2323ffs"],
   })
);
//Middleware Routers
app.use(authRouter);
app.use(productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Listing for port ${PORT}`);
});
