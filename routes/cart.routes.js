const express = require("express");
const cartRoutes = express.Router();
const cart = require("./cart");

cartRoutes.get("/cart", (req, res) => {
  res.send(cart);
});
cartRoutes.post("/cart", (req, res) => {
  cart.push(req.body);
  res.send(cart);
});
cartRoutes.put("/cart/:id", (req, res) => {
  const index = cart.findIndex(person => person.id === req.params.id);
  cart.splice(index, 1, req.body);
  res.send(cart);
});
cartRoutes.delete("/cart/:id", (req, res) => {
  const index = cart.findIndex(person => person.id === req.params.id);
  cart.splice(index, 1);
  res.send(cart);
});
module.exports = cartRoutes;
