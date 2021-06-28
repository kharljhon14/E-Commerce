const express = require("express");
const router = express.Router();

const cartsRepo = require("../repositories/carts");

//Receive a post request to add an item in the cart
router.post("/cart/products", async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    //we dont have a cart, we need to create one
    //and stor the cart id on the req.session.cartId

    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    //we have a cart get it from the repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    //increment quantity and save cart
    existingItem.quantity++;
  } else {
    //add new product id to items array
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, { items: cart.items });

  res.send("Product added to cart");
});
//Receive a get request to show all items in cart

//receive a post to delete item in the cart

module.exports = router;
