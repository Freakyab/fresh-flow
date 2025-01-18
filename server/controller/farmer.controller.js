const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Farmer = require("../model/farmer.model");
const Transaction = require("../model/transaction.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

/*
 * @route POST /farmer/register
 */

router.post("/register", async (req, res) => {
  try {
    const {
      adharNo,
      farmerName,
      username,
      password,
      address,
      city,
      state,
      farmerContact,
      image,
      email,
      location,
      availableCrops,
    } = req.body;

    // Check if the user already exists
    const user = await Farmer.findOne({ username });
    if (user) return  res.status(400).json({ msg: "Username already exists" });

    // Create a new user
    const newUser = new Farmer({
      adharNo,
      farmerName,
      username,
      password,
      address,
      city,
      state,
      farmerContact,
      image,
      email,
      location,
      availableCrops,
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
      return  res.status(201).json({
        message: "Farmer register successfully",
        token,
        id: newUser._id,
      });
    } else {
      return res.status(400).json({ message: "Farmer register failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

/*
 * @route POST /farmer/login
 */

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validate
    if (!username || !password)
      return  res.status(400).json({ msg: "Not all fields have been entered." });

    // Check for existing user
    const user = await Farmer.findOne({ username });
    if (!user)
      return  res.status(400).json({ msg: "No Farmer with this username" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return  res.status(400).json({ msg: "Invalid credentials" });

    // Sign the token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    if (token) {
      return res
        .status(201)
        .json({ message: "Farmer login successfully", token, id: user._id });
    } else {
      return res.status(400).json({ message: "Farmer login failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

/*
 * @route PUT /farmer/update
 */

router.put("/update/:id", async (req, res) => {
  try {
    if (req.params.id == null) {
      return  res.status(400).json({
        isUpdated: false,
        message: "User does not exists",
      });
    }
    const user = await Farmer.findOne({ _id: req.params.id });
    if (!user)
      return  res.status(400).json({
        isUpdated: false,
        message: "User does not exists",
      });

    const {
      adharNo,
      farmerName,
      username,
      password,
      address,
      city,
      state,
      farmerContact,
      image,
      email,
      location,
      availableCrops,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = {
      adharNo,
      farmerName,
      username,
      password: hashedPassword,
      address,
      city,
      state,
      farmerContact,
      image,
      email,
      location,
      availableCrops,
    };

    await Farmer.findByIdAndUpdate(req.params.id, updatedUser);
    return res.json({
      isUpdated: true,
      message: "User updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isUpdated: false,
      message: "Server Error",
    });
  }
});

/*
 * @route Delete /farmer/delete/:id
 */

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const user = await Farmer.findOne({ _id: req.params.id });
    if (!user) return  res.status(400).json({ msg: "User does not exists" });

    await Farmer.findByIdAndDelete(req.params.id);
    return res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

/*
 * GET /farmer/getData
 */

router.get("/getData", auth, async (req, res) => {
  try {
    const user = await Farmer.findById(req.userId).select(
      "-password -_id -__v -otp"
    );

    if (!user) {
      return  res.status(400).json({ msg: "User does not exist" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
 * GET /farmer/getdatabyid
 */

router.post("/getdatabyid/:id", async (req, res) => {
  try {
    if (req.params.id == null) {
      return  res.status(400).json({
        isFound: false,
        message: "User does not exists",
      });
    }
    const user = await Farmer.findOne({ _id: req.params.id });
    if (!user)
      return  res.status(400).json({
        isFound: false,
        message: "User does not exists",
      });

    return res.status(200).json({
      isFound: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      isFound: false,
      error: error.message,
    });
  }
});

// MarketPlace

/*
 * GET /farmer/getdatabyid
 */

router.get("/markertPlace", async (req, res) => {
  try {
    const allFarmer = await Farmer.find().select(
      "farmerName address city state farmerContact image location email availableCrops"
    );
    cropOrderList = [];

    allFarmer.forEach((item) => {
      if (item.availableCrops.length > 0) {
        item.availableCrops.forEach((crop) => {
          cropOrderList.push({
            _id: item._id,
            farmerName: item.farmerName,
            address: item.address,
            city: item.city,
            state: item.state,
            farmerContact: item.farmerContact,
            image: item.image,
            email: item.email,
            location: item.location,
            crop: crop.typeOfCrop,
            price: crop.price,
            availableQuantity: crop.quantity,
          });
        });
      }
    });
    if (!cropOrderList) {
      return  res.status(400).json({ isFound: false, message: "No data found" });
    }

    return  res.json({
      isFound: true,
      data: cropOrderList,
    });
  } catch (error) {
    return  res.status(500).json({ isFound: false, message: error.message });
  }
});

/*
 * GET /warehouse/getData
 */

router.get("/getData", auth, async (req, res) => {
  try {
    const user = await Farmer.findById(req.userId).select(
      "-_id -password -__v -otp"
    );
    if (!user) return  res.status(400).json({ msg: "User does not exists" });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/getFarmerExpenseChart/:id", async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) {
      return  res.status(400).json({ msg: "Farmer not found" });
    } else {
      const allTransaction = await Transaction.find({
        farmerId: req.params.id,
        status: "accepted",
      }).exec(); // Executing the query to return a promise

      let customerOrderList = [];
      allTransaction.forEach((item) => {
        if (item.customerId != undefined) {
          customerOrderList.push(item);
        }
      });
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

        const ExpensesPerMonth = customerOrderList.reduce((acc, obj) => {
          const date = new Date(obj.createdAt);
          const monthName = monthNames[date.getMonth()]; // Get month name from array
          acc[monthName] = (acc[monthName] || 0) + obj.price * obj.quantity;
          return acc;
        }, {});
        return res.status(200).json(ExpensesPerMonth);
      } else {
        return res.status(400).json({ msg: "No data found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/getOccupiedWarehouseInventoryPie/:id", async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    const allTransaction = await Transaction.find({
      farmerId: req.params.id,
      status: "accepted",
    }).exec(); // Executing the query to return a promise

    let customerOrderList = [];
    allTransaction.forEach((item) => {
      if (item.customerId == undefined) {
        customerOrderList.push(item);
      }
    });

    if (!farmer) {
      return  res.status(400).json({ msg: "Farmer not found" });
    } else {
      let freeSpace = 0;

      let occupied = [];

      allTransaction.forEach((transaction) => {
        occupied = [
          ...occupied,
          { type: transaction.typeOfCrop, quantity: transaction.quantity },
        ];
      });

      // if type of crop is same then add the quantity result should be in array
      const result = occupied.reduce((acc, obj) => {
        const found = acc.find((item) => item.type === obj.type);
        if (found) {
          found.quantity += obj.quantity;
          freeSpace = freeSpace + 1;
        } else {
          acc.push({ type: obj.type, quantity: obj.quantity });
        }
        return acc;
      }, []);

      const data = {
        unoccupied: freeSpace,
        occupied: result,
        totalSpace: freeSpace,
      };
      if (data) {
        return res.status(200).json(data);
      } else {
        return res.status(400).json({ msg: "data found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/check", async (req, res) => {
  return res.json({ msg: "working" });
});

module.exports = router;
