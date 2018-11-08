const { Order, validate } = require("../models/orders");
const { Customer } = require("../models/customers");
const { Product } = require("../models/products");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find().sort("dateCreate");
  res.send(orders);
});

router.post("/", async (req, res) => {
  // console.log(validate(req.body.error));
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    res.status(400).send("Customer not found");
  }

  // save to database
});

module.exports = router;
