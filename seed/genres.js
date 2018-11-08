const seeder = require("mongoose-seed");
const faker = require("faker");

let items = [];
for (i = 0; i < 15; i++) {
  items.push({
    name: faker.commerce.productName()
  });
}

let data = [
  {
    model: "Genre",
    documents: items
  }
];

// connect mongodb
seeder.connect(
  "mongodb://localhost/tshirt",
  function() {
    seeder.loadModels([
      "../models/genres" // load mongoose model
    ]);
    seeder.clearModels(["Genre"], function() {
      seeder.populateModels(data, function() {
        seeder.disconnect();
      });
    });
  }
);
