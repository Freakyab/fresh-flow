const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Customer = require("../model/customer.model");
const Transaction = require("../model/transaction.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

/*
 * @route POST /Customer/register
 */

router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      username,
      password,
      address,
      city,
      state,
      phoneNo,
      image,
      location ,
    } = req.body;
    // Check if the user already exists
    const user = await Customer.findOne({ username });
    if (user) return res.status(400).json({ msg: "Username already exists" });

    // Create a new user
    const newUser = new Customer({
      fullName,
      email,
      username,
      password,
      address,
      city,
      state,
      phoneNo,
      image,
      location,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Replace the password with the hashed password
    newUser.password = hashedPassword;

    // Save the user
    await newUser.save();

    // Sign the token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET
    );

    if (token) {
      res.status(201).json({
        message: "Customer register successfully",
        token,
        id: newUser._id,
      });
    } else {
      res.status(400).json({ message: "Customer register failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/*
 * @route POST /Customer/login
 */

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate
    if (!username || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    // Check for existing user
    const user = await Customer.findOne({ username });
    if (!user)
      return res.status(400).json({ msg: "No Customer with this username" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Sign the token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    if (token) {
      res
        .status(201)
        .json({ message: "Customer login successfully", token, id: user._id });
    } else {
      res.status(400).json({ message: "Customer login failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/*
 * @route PUT /Customer/update
 */

router.put("/update", auth, async (req, res) => {
  try {
    const { fullName, email, username } = req.body;

    // Check if the user already exists
    const existingUser = await Customer.findById(req.userId);

    // Update the user fields
    await Customer.updateOne(
      { _id: req.userId },
      {
        fullName,
        email,
        username,
      }
    );

    // Sign the token
    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET
    );

    if (token) {
      res.status(201).json({ message: "Customer updated successfully", token });
    } else {
      res.status(400).json({ message: "Customer update failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/*
 * @route Delete /Customer/delete/:id
 */

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const user = await Customer.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    await Customer.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/*
 * GET /warehouse/getdatabyid
 */

router.post("/getdatabyid/:id", async (req, res) => {
  try {
    const user = await Customer.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getCustomerExpenseChart/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(400).json({ msg: "Customer not found" });
    } else {
      const allTransaction = await Transaction.find({
        customerId: req.params.id,
        status: "accepted",
      }).exec(); // Executing the query to return a promise

      if (allTransaction && allTransaction.length > 0) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        
        const ExpensesPerMonth = allTransaction.reduce((acc, obj) => {
          const date = new Date(obj.createdAt);
          const monthName = monthNames[date.getMonth()]; // Get month name from array
          acc[monthName] = (acc[monthName] || 0) + obj.price * obj.quantity;
          return acc;
        }, {});
        
        res.status(200).json(ExpensesPerMonth);
      } else {
        res.status(400).json({ msg: "No data found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
