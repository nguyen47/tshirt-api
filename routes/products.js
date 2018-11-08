const express = require("express");
const { Product, validate } = require("../models/products");
const { Genre } = require("../models/genres");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = await validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Genre ID is not valid");
  }

  let product = new Product({
    name: req.body.name,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    price: req.body.price
  });

  product = await product.save();

  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = await validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Genre ID is not valid");
  }

  const product = Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      price: req.body.price
    },
    {
      new: true
    }
  );

  if (!product) {
    return res.status(404).send("Product is not valid");
  }

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) {
    return res.status(404).send("Product is not valid");
  }
  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).send("Product not found");
  }
  res.send(product);
});

module.exports = router;
