const seeder = require("mongoose-seed");
const faker = require("faker");
const { Genre } = require("../models/genres");
const mongoose = require("mongoose");
const _ = require("lodash");
mongoose
  .connect(
    "mongodb://localhost/tshirt",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to database for seed"))
  .catch(err => console.error("Could not connect to database"));

const doSeed = async () => {
  const genres = await Genre.find();
  const getRandom = _.sample(genres);

  let items = [];
  for (i = 0; i < 150; i++) {
    items.push({
      name: faker.commerce.product(),
      numberInStock: Math.floor(Math.random() * Math.floor(255)),
      genre: {
        _id: getRandom._id,
        name: getRandom.name
      },
      price: Math.floor(Math.random() * Math.floor(255))
    });
  }

  let data = [
    {
      model: "Product",
      documents: items
    }
  ];

  // connect mongodb
  seeder.connect(
    "mongodb://localhost/tshirt",
    function() {
      seeder.loadModels([
        "../models/products" // load mongoose model
      ]);
      seeder.clearModels(["Product"], function() {
        seeder.populateModels(data, function() {
          seeder.disconnect();
        });
      });
    }
  );
};

doSeed();
