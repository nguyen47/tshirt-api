const config = require("config");
const auth = require("./routes/auth");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const products = require("./routes/products");
const orders = require("./routes/orders");
const users = require("./routes/users");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
mongoose
  .connect(
    "mongodb://localhost/tshirt",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Could not connect to database"));

mongoose.set("useCreateIndex", true);

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/products", products);
app.use("/api/orders", orders);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
