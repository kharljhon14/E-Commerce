const express = require("express");
const router = express.Router();
const multer = require("multer");

const { handleError } = require("./middlewares");
const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const productsIndexTemplate = require("../../views/admin/products/index");
const { requireTitle, requirePrice } = require("./validators");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleError(productsNewTemplate),
  async (req, res) => {
    //Not the best way to store file only use for personal projects
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });
    res.send("Submited");
  }
);

module.exports = router;
