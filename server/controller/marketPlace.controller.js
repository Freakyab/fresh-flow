 const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Farmer = require("../model/farmer.model");
const Warehouse = require("../model/warehouse.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");


/*
  * GET /marketplace
    get all the warehouses with the crops that the farmer has
 */

// Farmer purchase warehouse

router.get("/", async (req, res) => {
  try {
    const allWarehouses = await Warehouse.find().exec();
    
    // Use map to transform the data
    const transformedWarehouses = allWarehouses.map((item) => ({
      id: item._id,
      owner: item.name,
      location: item.location,
      availableCapacity: item.facility.capacity,
      price: item.price,
      tempType: item.facility.tempType,
      certifications: item.certifications,
      security: item.security,
      phoneNo: item.phoneNo,
      email: item.email,
      temp_low: item.facility.temperature.low,
      temp_high: item.facility.temperature.high,
      typeOfCrop: item.typeOfCrop,
    }));

    // Return the transformed warehouses
    res.status(200).json(transformedWarehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


  


module.exports = router;