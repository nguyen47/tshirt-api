const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    isPublish: {
      type: Boolean,
      default: false
    },
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  quantity: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  customers: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
      }
    }),
    required: true
  },
  products: [productSchema],
  dateCreate: {
    type: Date,
    required: true,
    default: Date.now
  },
  totalPrice: {
    type: Number,
    min: 0
  }
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(orders) {
  const schema = {
    customerId: Joi.string().required(),
    product: Joi.array().required()
  };
  return Joi.validate(orders, schema);
}

exports.Order = Order;
exports.validate = validateOrder;
