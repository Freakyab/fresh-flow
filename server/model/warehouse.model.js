const mongoose = require("mongoose");
const client = require("../config/connect");

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  ownerName: {
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
  city: {
    type: String,
    // required: true,
  },
  facility: {
    temperature: {
      low: {
        type: Number,
        // required: true,
      },
      high: {
        type: Number,
        // required: true,
      },
    },
    capacity: {
      type: Number,
      // required: true,
    },
    occupancy: {
      type: Number,
      // required: false,
    },
    tempType: {
      type: String,
      // required: true,
    },
  },
  certifications: {
    type: String,
    // required: true,
  },
  security: {
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
  servicesOffered: {
    type: String,
    // required: true,
  },
  price : {
    type : Number,
    // require : true
  },
  otp: {
    type: Number,
    // required: false,
  },
  typeOfCrop: {
    type: [String],
    // required: true,
  },
  duration: {
    type: Number,
    required: false,
  },
});

const Warehouse = client.model("Warehouse", warehouseSchema);
module.exports = Warehouse;
