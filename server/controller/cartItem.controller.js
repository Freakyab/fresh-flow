const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const CartItems = require("../model/cartItem.model");
const Transaction = require("../model/transaction.model");
const Farmer = require("../model/farmer.model");
const Customer = require("../model/customer.model");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const auth = require("../middleware/auth.middleware");
const e = require("express");

/*
 * @route POST /cartItems/addOrder
 */

router.post("/addOrder/:id", async (req, res) => {
  try {
    console.log("addOrder got called");
    const customerId = req.params.id;
    const { order } = req.body;
    const cartExist = await CartItems.find({ customerId: customerId }).exec();

    if (cartExist[0]) {
      const orderItems = cartExist[0].orderItems;
      orderItems.push(order);
      await CartItems.findByIdAndUpdate(cartExist[0]._id, {
        orderItems: orderItems,
      });
      res.status(200).json({ message: "Order Added", isOrderAdded: true });
    } else {
      const cartItems = new CartItems({
        orderItems: [order],
        customerId: new ObjectId(customerId),
      });
      await cartItems.save();
      res.status(200).json({ message: "Order Added", isOrderAdded: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", isOrderAdded: false });
  }
});

/*
 * @route POST /cartItems/getOrder
 */

router.post("/setOrderItems/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const cartItemList = await CartItems.find({
      customerId: customerId,
    }).exec();

    if (cartItemList[0].orderItems.length > 0) {
      res
        .status(200)
        .json({ orderItems: cartItemList[0].orderItems, isOrderFound: true });
    } else {
      res.status(200).json({ orderItems: [], isOrderFound: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, isOrderFound: false });
  }
});

/*
 * @route POST /cartItems/removeOrder
 */
router.post("/removeOrder/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const { id, crop } = req.body;
    console.log(id, crop);
    const cartExist = await CartItems.find({ customerId: customerId }).exec();

    if (cartExist[0]) {
      const orderItems = cartExist[0].orderItems;
      let newOrderItems = [];
      orderItems.forEach((order) => {
        if (
          (order._id = id && order.crop.toLowerCase() != crop.toLowerCase())
        ) {
          newOrderItems.push(order);
        }
      });
      const updatedCart = await CartItems.findByIdAndUpdate(cartExist[0]._id, {
        orderItems: newOrderItems,
      });

      if (!updatedCart) {
        res
          .status(200)
          .json({ message: "Order Not Removed", isOrderRemoved: false });
      } else {
        res
          .status(200)
          .json({ message: "Order Removed", isOrderRemoved: true });
      }
    } else {
      res
        .status(200)
        .json({ message: "Order Not Found", isOrderRemoved: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", isOrderRemoved: false });
  }
});

/*
 * @route POST /cartItems/addQuantity
 */

router.put("/addQuantity/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const { id, crop } = req.body;
    const cartExist = await CartItems.find({ customerId: customerId }).exec();
    if (cartExist[0]) {
      const orderItems = cartExist[0].orderItems;
      orderItems.forEach((order) => {
        if (
          order._id.toString() == id &&
          order.crop.toLowerCase() == crop.toLowerCase()
        ) {
          order.availableQuantity = order.availableQuantity + 1;
        }
      });
      const updatedCart = await CartItems.findByIdAndUpdate(cartExist[0]._id, {
        orderItems: orderItems,
      });

      if (!updatedCart) {
        res
          .status(200)
          .json({ message: "Quantity Not Added", isQuantityAdded: false });
      } else {
        res
          .status(200)
          .json({ message: "Quantity Added", isQuantityAdded: true });
      }
    } else {
      res
        .status(200)
        .json({ message: "Order Not Found", isQuantityAdded: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", isQuantityAdded: false });
  }
});

/*
 * @route POST /cartItems/removeQuantity
 */

router.put("/setOrderQuantity/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const { id, crop, quantity } = req.body;
    const cartExist = await CartItems.find({ customerId: customerId }).exec();
    if (cartExist[0]) {
      const orderItems = cartExist[0].orderItems;

      orderItems.forEach((order) => {
        if (
          order._id.toString() == id &&
          order.crop.toLowerCase() == crop.toLowerCase()
        ) {
          order.availableQuantity = quantity;
          if (quantity == 0) {
            orderItems.splice(orderItems.indexOf(order), 1);
          }
        }
      });
      const updatedCart = await CartItems.findByIdAndUpdate(cartExist[0]._id, {
        orderItems: orderItems,
      });

      if (!updatedCart) {
        res
          .status(200)
          .json({ message: "Quantity Not Removed", isQuantitySet: false });
      } else {
        res
          .status(200)
          .json({ message: "Quantity Removed", isQuantitySet: true });
      }
    } else {
      res
        .status(200)
        .json({ message: "Order Not Found", isQuantitySet: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", isQuantityRemoved: false });
  }
});

/*
 * @route POST /cartItems/clearOrderItems
 */

router.post("/clearOrderItems/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const cartExist = await CartItems.find({ customerId: customerId }).exec();
    if (cartExist[0]) {
      const updatedCart = await CartItems.findByIdAndUpdate(cartExist[0]._id, {
        orderItems: [],
      });

      if (!updatedCart) {
        res
          .status(200)
          .json({ message: "Order Not Cleared", isOrderCleared: false });
      } else {
        res
          .status(200)
          .json({ message: "Order Cleared", isOrderCleared: true });
      }
    } else {
      res
        .status(200)
        .json({ message: "Order Not Found", isOrderCleared: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", isOrderCleared: false });
  }
});

/*
 * @route POST /cartItems/onPay
 */

router.post("/onPay/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const cartExist = await CartItems.findOne({ customerId: customerId });
    const customer = await Customer.findById(customerId);

    if (cartExist) {
      const orderItems = cartExist.orderItems;

      // Array to hold promises for saving transactions
      const transactionPromises = [];

      for (const order of orderItems) {
        const farmer = await Farmer.findById(order._id);
        if (!farmer) {
          return res.status(400).json({ message: "Farmer not found" });
        } else {
          const newAvailableCrops = farmer.availableCrops.map((crop) => {
            if (crop.typeOfCrop.toLowerCase() === order.crop.toLowerCase()) {
              crop.quantity -= (order.availableQuantity * 50) / 100;
              if (crop.quantity < 0) {
                // If quantity is not available, cancel the transaction
                return res
                  .status(400)
                  .json({
                    message: "Not enough quantity available",
                    isPaid: false,
                  });
              }
            }
            return crop; // Return the modified crop
          });

          const transaction = new Transaction({
            farmerId: order._id,
            farmerName: order.farmerName,
            customerId: customerId,
            customerName: customer.fullName,
            quantity: order.availableQuantity,
            price: order.price,
            typeOfCrop: order.crop,
            status: "accepted",
          });

          await Farmer.findByIdAndUpdate(order._id, {
            availableCrops: newAvailableCrops,
          });

          transactionPromises.push(transaction.save()); // Push promise to array
        }
      }

      // Wait for all transaction saves to complete
      await Promise.all(transactionPromises);

      const updatedCart = await CartItems.findByIdAndUpdate(cartExist._id, {
        orderItems: [],
      });

      if (!updatedCart) {
        res.status(400).json({ message: "Payment Failed", isPaid: false });
      } else {
        res.status(200).json({ message: "Payment Success", isPaid: true });
      }
    } else {
      res.status(404).json({ message: "Order Not Found", isPaid: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", isPaid: false });
  }
});

module.exports = router;
