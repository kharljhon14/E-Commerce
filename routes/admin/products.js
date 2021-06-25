const express = require("express");
const router = express.Router();
const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");

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

module.exports = router;
