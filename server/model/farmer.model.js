const mongoose = require("mongoose");
const client = require("../config/connect");

const farmerSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true,
  },
  adharNo: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
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
  availableCrops: [
    {
      typeOfCrop: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
},{
  timestamps: true,
  
});

const Farmer = client.model("Farmer", farmerSchema);

module.exports = Farmer;
