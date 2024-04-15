const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Warehouse = require("../model/warehouse.model");
const Transaction = require("../model/transaction.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

/*
 * @route POST /warehouse/register
 */

router.post("/register", async (req, res) => {
  try {
    const {
      ownerName,
      name,
      username,
      password,
      address,
      city,
      state,
      capacity,
      registrationDate,
      registrationValidUpto,
      phoneNo,
      status,
      type,
      image,
      location,
      price,
      email,
      occupied,
      typeOfCrop,
    } = req.body;

    // Check if the user already exists
    const user = await Warehouse.findOne({ username });
    if (user) return res.status(400).json({ msg: "Username already exists" });

    // Create a new user
    const newUser = new Warehouse({
      ownerName,
      name,
      username,
      password,
      address,
      city,
      state,
      capacity,
      registrationDate,
      registrationValidUpto,
      phoneNo,
      status,
      type,
      image,
      location,
      price,
      email,
      occupied,
      typeOfCrop,
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
        message: "Warehouse owner register successfully",
        token,
        id: newUser._id,
      });
    } else {
      res.status(400).json({ message: "Warehouse owner register failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
 * @route POST /warehouse/login
 */

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate
    if (!username || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    // Check if the user exists
    const user = await Warehouse.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this username has been registered" });

    // Check if the password is correct
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch)
    //   return res.status(400).json({ msg: "Invalid credentials", token , id : user._id});

    // Sign the token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    if (token) {
      res.status(201).json({
        message: "Warehoouse owner login successfully",
        token,
        id: user._id,
      });
    } else {
      res.status(400).json({ message: "Warehouse owner login failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
 * @route PUT /warehouse/update/:id
 */

router.put("/update/:id", async (req, res) => {
  try {
    const {
      ownerName,
      name,
      username,
      password,
      address,
      city,
      state,
      capacity,
      registrationDate,
      registrationValidUpto,
      phoneNo,
      status,
      type,
      image,
      location,
      price,
      email,
      occupied,
      typeOfCrop,
    } = req.body;

    // Check if the user already exists
    const user = await Warehouse.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    const getDateInMonthAbbreviation = (date) => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      // 22-12-2011 to 22-DEC-2021
      return (
        date.split("-")[2] +
        "-" +
        monthNames[parseInt(date.split("-")[1]) - 1] +
        "-" +
        date.split("-")[0]
      );
    };

    const newRegistrationDate = getDateInMonthAbbreviation(registrationDate);

    var newDate = new Date(registrationDate);

    // Subtract 5 years and 1 day
    newDate.setFullYear(registrationDate.getFullYear() - 5);
    newDate.setDate(registrationDate.getDate() - 1);

    // Format the resulting date
    const newRegistrationValidUpto =
      newDate.getDate() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getFullYear();

    // const newRegistrationValidUpto = `${parseInt(newRegistrationDate.split("-")[0])-1}-${newRegistrationDate.split("-")[1]}-${parseInt(newRegistrationDate.split("-")[2])+5}`
    // const newRegistrationValidUpto = getDateInMonthAbbreviation(
    //   registrationValidUpto
    // );
    // Create a new user
    const newUser = {
      ownerName,
      name,
      username,
      password,
      address,
      city,
      state,
      capacity,
      registrationDate: newRegistrationDate,
      registrationValidUpto: newRegistrationValidUpto,
      phoneNo,
      status,
      type,
      image,
      location,
      price,
      email,
      occupied,
      typeOfCrop,
    };

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Replace the password with the hashed password
    newUser.password = hashedPassword;

    // Save the user
    await Warehouse.findByIdAndUpdate(req.params.id, newUser);

    res.json({ msg: "User updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 * @route DELETE /warehouse/delete
 */

router.delete("/delete:id", auth, async (req, res) => {
  try {
    const user = await Warehouse.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    await Warehouse.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 * GET /warehouse/getData
 */

router.get("/getData", auth, async (req, res) => {
  try {
    const user = await Warehouse.findById(req.userId).select(
      "-_id -password -__v -otp"
    );
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 * GET /warehouse/getdatabyid
 */

router.post("/getdatabyid/:id", async (req, res) => {
  try {
    const user = await Warehouse.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/*
 * GET /warehouse/allwarehouse
 */

router.get("/allwarehouse", async (req, res) => {
  try {
    const warehouse = await Warehouse.find();
    if (!warehouse) return res.status(400).json({ msg: "Warehouse not found" });
    else {
      res.status(200).json(warehouse);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getWarehouseExpenseChart/:id", async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(400).json({ msg: "Warehouse not found" });
    } else {
      const allTransaction = await Transaction.find({
        warehouseId: req.params.id,
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
          acc[monthName] = (acc[monthName] || 0) + obj.price;
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

router.get("/getOccupiedWarehousePie/:id", async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    const allTransaction = await Transaction.find({
      warehouseId: req.params.id,
      status: "accepted",
    }).exec(); // Executing the query to return a promise

    if (!warehouse) {
      return res.status(400).json({ msg: "Warehouse not found" });
    } else {
      const freeSpace = warehouse.capacity - warehouse.occupied;

      let occupied = [];

      allTransaction.forEach((transaction) => {
        occupied = [
          ...occupied,
          { type: transaction.typeOfCrop, quantity: transaction.quantity },
        ];
      });

      const data = {
        unoccupied: freeSpace,
        occupied: occupied,
        totalSpace: parseInt(warehouse.capacity),
      };
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ msg: "data found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
