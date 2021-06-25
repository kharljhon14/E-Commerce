const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("./validators");

//List all Products
//Create a product
//submit product
//edit product
//edit and sumbit product
//delete product

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
   res.send(productsNewTemplate({}));
});

router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
   const errors = validationResult(req);
   console.log(errors);
   res.send("Submited");
});

module.exports = router;
