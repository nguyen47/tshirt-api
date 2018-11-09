const _ = require("lodash");
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
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    res.status(400).send("Customer not found");
  }

  // Check ID of Product
  const productsItem = [];
  for (let i = 0; i < req.body.product.length; i++) {
    const product = await Product.findById(req.body.product[i]._id);
    if (!product) {
      return res.status(400).send(`Product ${i} not found`);
    }

    if (product.numberInStock === 0) {
      return res.status(400).send("Product is out of sotck");
    }

    const productItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: req.body.product[i].quantity
    };

    productsItem.push(productItem);
  }

  let orders = new Order({
    customers: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    products: productsItem,
    totalPrice: _.sumBy(productsItem, function(o) {
      return o.price * o.quantity;
    })
  });

  orders = await orders.save();

  for (let i = 0; i < productsItem.length; i++) {
    const productItemLeft = await Product.findById(productsItem[i]._id);
    productItemLeft.numberInStock =
      productItemLeft.numberInStock - productsItem[i].quantity;
    productItemLeft.save();
  }

  res.send(orders);
});

module.exports = router;
