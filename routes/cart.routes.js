const express = require("express");
const cartRoutes = express.Router();
const cart = require("./cart");
const pool = require("../connections/connection.js");

function selectAllItems(req, res) {
  pool.query("select * from shoppingcart order by id").then(result => {
    res.send(result.rows); //makes it reusable
  });
}

cartRoutes.get("/shoppingcart", selectAllItems); //The request is the endpoint, and the function is the response
//   res.send("GET works");

cartRoutes.post("/shoppingcart", (req, res) => {
  pool
    .query(
      "insert into shoppingcart (product, price, quantity) values ($1::text, $2::int, $3::int)", //this is syntax for SQL
      [req.body.product, req.body.price, req.body.quantity]
    )
    .then(() => {
      selectAllItems(req, res);
    }); //Second value in this will always be an array
});

cartRoutes.put("/shoppingcart/:id", (req, res) => {
  //:id targets the specific row with the id we're targeting
  pool
    .query("update shoppingcart set quantity=$1::int where id=$2::int", [
      req.body.quantity,
      req.params.id
    ])
    .then(() => {
      selectAllItems(req, res);
    });
});

cartRoutes.delete("/shoppingcart/:id", (req, res) => {
  pool
    .query("delete from shoppingcart where id=$1::int", [req.params.id])
    .then(() => {
      selectAllItems(req, res);
    });
});
module.exports = cartRoutes;
