const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const products = require("./routes/products");
const orders = require("./routes/orders");

const express = require("express");
const app = express();

mongoose
  .connect(
    "mongodb://localhost/tshirt",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Could not connect to database"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/products", products);
app.use("/api/orders", orders);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
