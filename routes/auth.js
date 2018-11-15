const jwt = require("jsonwebtoken");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/users");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    "This is my private key"
  );

  res.send(token);
});

function validate(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = router;