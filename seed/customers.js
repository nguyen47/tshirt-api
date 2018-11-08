const seeder = require("mongoose-seed");
const faker = require("faker");

let items = [];
for (i = 0; i < 30; i++) {
  items.push({
    name: faker.commerce.productName(),
    phone: faker.phone.phoneNumber(),
    isGold: faker.random.boolean()
  });
}

let data = [
  {
    model: "Customer",
    documents: items
  }
];

// connect mongodb
seeder.connect(
  "mongodb://localhost/tshirt",
  function() {
    seeder.loadModels([
      "../models/customers" // load mongoose model
    ]);
    seeder.clearModels(["Customer"], function() {
      seeder.populateModels(data, function() {
        seeder.disconnect();
      });
    });
  }
);
