const mongoose = require("mongoose");
const client = require("../config/connect");

const TransactionScheme = new mongoose.Schema({
    warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  crop: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  duration : {
    type : Number,
    required : true
  },
  status: {
    enum: ["pending", "accepted", "rejected"],
    type: String,
    default: "pending",
    required: true,
  },
});

const Transaction = client.model("Transaction", TransactionScheme);

module.exports = Transaction;