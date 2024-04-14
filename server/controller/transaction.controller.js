const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Farmer = require("../model/farmer.model");
const Warehouse = require("../model/warehouse.model");
const Transaction = require("../model/transaction.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

/* Farmer purchase warehouse
 * post /transaction/farmer-purchase
 */
router.post("/farmer-purchase/:id", async (req, res) => {
  try {
    const { warehouseId, quantity, price, duration,typeOfCrop } = req.body;
    const farmerId = req.params.id;
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(400).json({ message: "Farmer not found" });
    }
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(400).json({ message: "Warehouse not found" });
    } else {
      const farmerName = farmer.farmerName;
      const warehouseName = warehouse.name;

      const Transcation = new Transaction({
        farmerName,
        warehouseName,
        warehouseId,
        price,
        farmerId,
        quantity,
        duration,
        typeOfCrop,
        status: "pending",
      });

      await Transcation.save();

      if (Transcation) {
        res.status(200).json({ Transcation });
      } else {
        res.status(400).json({ error: "Something went wrong" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/*
 ! Warehouse Dashboard
 *Warehouse all request info 
 */

router.post("/order-request/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { typeOfId } = req.body;
    const type = typeOfId;
    let allTransaction;
    if (type === "warehouseId") {
      allTransaction = await Transaction.find({ warehouseId: userId });
    }
    if (type === "farmerId") {
      allTransaction = await Transaction.find({ farmerId: userId });
    }
    if (type === "customerId") {
      allTransaction = await Transaction.find();
    }
    if (allTransaction) {
      res.status(200).json({ allTransaction });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/order-top-request/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { typeOfId } = req.body;
    const type = typeOfId;
    let allTransaction;
    if (type === "warehouseId") {
      // get request of warehouse
     allTransaction = await Transaction.find({ warehouseId: userId }).limit(3).sort({createdAt:-1}) ;
      // allTransaction = await Transaction.find({ warehouseId: userId }).limit(3);
    }
    if (type === "farmerId") {
      allTransaction = await Transaction.find({ farmerId: userId }).limit(3);
    }
    if (type === "customerId") {
      allTransaction = await Transaction.find().limit(3);
    }
    if (allTransaction) {
      res.status(200).json({ allTransaction });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 *Warehouse accept request
 */

router.put("/accept/:id", async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findById(transactionId);
    const warehouse = await Warehouse.findById(transaction.warehouseId);
    if (transaction) {
      transaction.status = "accepted";
      if (warehouse.capacity < 0) {
        res.status(400).json({ message: "no space available" });
      }
      if (warehouse.capacity < transaction.quantity) {
        res.status(400).json({ message: "no space available" });
      }
      let capacity = parseFloat(warehouse.capacity);
      capacity -= transaction.quantity;
      let occupied = parseFloat(warehouse.occupied) || 0;
      occupied += transaction.quantity;
      warehouse.capacity = capacity.toString();
      warehouse.occupied = occupied.toString();
      await transaction.save();
      await warehouse.save();
      res.status(200).json({ message: "status updated" });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/*
 *Warehouse  decline request
 */

router.put("/reject/:id", async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findByIdAndUpdate(transactionId, {
      status: "rejected",
    });
    if (transaction) {
      res.status(200).json({ message: "status updated" });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 *Warehouse Occupied Space
 */
router.put("/warehouse-occupied-space/", auth, async (req, res) => {
  try {
    const warehouseId = req.userId;
    const allTransaction = await Transaction.find({
      warehouseId: warehouseId,
      status: "accepted",
    });

    if (allTransaction) {
      res.status(200).json({ transaction: allTransaction });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 ! Farmer Dashboard
 * all request info 
 */
router.get("/farmer-request/:id", auth, async (req, res) => {
  try {
    const farmerId = req.params.id;
    const allTransaction = await Transaction.find({ farmerId: farmerId });
    let warehouseInfo = [];
    for (let i = 0; i < allTransaction.length; i++) {
      let warehouse = await Warehouse.findById(allTransaction[i].warehouseId);
      warehouseInfo.push({
        warehouseOwner: warehouse.name,
        address: warehouse.location,
        crop: allTransaction[i].crop,
        quantity: allTransaction[i].quantity,
        duration: allTransaction[i].duration,
        phoneNo: warehouse.phoneNo,
        email: warehouse.email,
      });
    }
    if (warehouseInfo) {
      res.status(200).json({ warehouseInfo });
    } else {
      res.status(400).json({ message: "no request found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
 *Farmer  all request
 */
router.get("/farmer-all-request/:id", auth, async (req, res) => {
  try {
    const farmerId = req.params.id;
    const allTransaction = await Transaction.find({ farmerId: farmerId });

    if (!allTransaction || allTransaction.length === 0) {
      return res.status(400).json({ message: "No request found" });
    }

    const warehouseIds = allTransaction.map(
      (transaction) => transaction.warehouseId
    );
    const allWarehouses = await Warehouse.find({ _id: { $in: warehouseIds } });

    // Map transactions with specific fields
    const modifiedTransactions = allTransaction.map((transaction) => {
      const warehouse = allWarehouses.find((w) =>
        w._id.equals(transaction.warehouseId)
      );

      return {
        // Add other specific fields you want to include
        warehouseName: warehouse ? warehouse.name : null,
        warehouseAddress: warehouse ? warehouse.location : null,
        warehousePhoneNo: warehouse ? warehouse.phoneNo : null,
        warehousePrice: warehouse ? warehouse.price : null,
        status: transaction.status,
        // Include other transaction fields as needed
      };
    });

    res.status(200).json({ allTransaction: modifiedTransactions });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
