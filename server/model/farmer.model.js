const mongoose = require("mongoose");
const client = require("../config/connect");

const farmerSchema = new mongoose.Schema({
  adharNo: {
    type: String,
    // required: true,
  },
  fullName: {
    type: String,
    // required: true,
  },
  phoneNo: {
    type: Number,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  address: {
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
  landSize: {
    type: Number,
    // required: true,
  },
  typeOfCrop: {
    type: [String],
    // required: true,
  },
  otp : {
    type : Number,
    // require : false
  }
});

const Farmer = client.model("Farmer", farmerSchema);

module.exports = Farmer;
