const mongoose = require("mongoose");
const client = require("../config/connect");

const TransactionScheme = new mongoose.Schema({
    warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  farmerName : {
    type : String,
    required : true
  },
  customerName : {
    type : String,
    required : false
  },
  warehouseName : {
    type : String,
    required : true
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customerID : {
    type : mongoose.Schema.Types.ObjectId,
    required : false
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
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
  typeOfCrop : {
    type : String,
    required : true
  }
},{
  timestamps: true
});

const Transaction = client.model("Transaction", TransactionScheme);

module.exports = Transaction;