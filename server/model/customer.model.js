const mongoose = require("mongoose");
const client = require("../config/connect");

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    address : {
        type : String,
        required : false
    },
    city : {
        type : String,
        required : false
    },
    state : {
        type : String,
        required : false
    },
    phoneNo : {
        type : Number,
        required : true
    },
    username: {
        type: String,
        required: true,
    },
    image : {
        type : String,
        required : false
    },
    password: {
        type: String,
        required : true
    },
    location : {
        type : [Number],
        required : false
    },
    otp : {
        type : Number,
        require : false
    }
});

const Customer = client.model("Customer", customerSchema);

module.exports = Customer;
