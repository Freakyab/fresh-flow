const mongoose = require("mongoose");
const client = require("../config/connect");

const cartItemsSchema = new mongoose.Schema({
  orderItems: [
    {
      farmerName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      farmerContact: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      location: {
        type: [Number],
        required: true,
      },
      crop: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      availableQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  totalSpend: [
    {
      price : {
        type: Number,
        required: false
      },
      month : {
        type: String,
        required: false
      }
    }
  ]
});

const CartItems = client.model("CartItems", cartItemsSchema);

module.exports = CartItems;
