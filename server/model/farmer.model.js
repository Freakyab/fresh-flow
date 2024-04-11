const mongoose = require("mongoose");
const client = require("../config/connect");

const farmerSchema = new mongoose.Schema({
  adharNo: {
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
  farmerName: {
    type: String,
    // required: true,
  },
  typeOfCrop: {
    type: [String],
    // required: true,
  },
  farmerContact: {
    type: Number,
    // required: true,
  },
  img :{
    type : String
  },
  email: {
    type: String,
    // required: true,
  },
  farmerLocation: {
    type: String,
    // required: true,
  },
  city : {
    type: String
  },
  otp : {
    type : Number,
    // require : false
  }
});

const Farmer = client.model("Farmer", farmerSchema);

module.exports = Farmer;
