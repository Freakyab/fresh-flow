const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Customer = require("../model/customer.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

/*
 * @route POST /Customer/register
 */

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    // Check if the user already exists
    const user = await Customer.findOne({ username });
    if (user) return res.status(400).json({ msg: "Username already exists" });

    // Create a new user
    const newUser = new Customer({
      fullName,
      email,
      username,
      password,
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
      res
        .status(201)
        .json({ message: "Customer register successfully", token ,id : newUser._id });
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
      res.status(201).json({ message: "Customer login successfully", token, id : user._id });
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
      { _id: req.userId},
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

module.exports = router;
