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
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required : true
    },
    otp : {
        type : Number,
        require : false
    }
});

const Customer = client.model("Customer", customerSchema);

module.exports = Customer;
