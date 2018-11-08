const mongoose = require("mongoose");
const { genreSchema } = require("./genres"); // Load Model Genre

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    isPublish: {
      type: Boolean,
      default: false
    },
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    genreId: Joi.required().string(),
    numberInStock: Joi.string()
      .required()
      .min(0)
      .max(255),
    price: Joi.number()
      .min(0)
      .max(255)
  };

  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
