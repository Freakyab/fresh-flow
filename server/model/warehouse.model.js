const mongoose = require("mongoose");
const client = require("../config/connect");

const warehouseSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  username: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  capacity: {
    type: String,
    // required: true,
  },
  registrationDate: {
    type: String,
    // required: true,
  },
  registrationValidUpto 
  : {
    type: String,
    // required: true,
  },
  phoneNo: {
    type: Number,
    // required: true,
  },
  status: {
    type: String,
    // required: true,
  },
  type : {
    type : [String],
    // required : true
  },
  image : {
    type : String,
    // required : true
  },
  location: {
    type: [Number],
    // required: true,
  },
  price : {
    type : Number,
    // require : true
  },
  email : {
    type : String,
    // require : true
  },
  otp: {
    type: Number,
    // required: false,
  },
  occupied : {
    type : String,
    // required : true
  },
  typeOfCrop : {
    type : {String},
    // required : true
  },
});

const Warehouse = client.model("Warehouse", warehouseSchema);
module.exports = Warehouse;
