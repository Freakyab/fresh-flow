const express = require("express");
const router = express.Router();
const Farmer = require("../model/farmer.model");
const Warehouse = require("../model/warehouse.model");
const auth = require("../middleware/auth.middleware");

router.post("/farmer", async (req, res) => {
  try { 
     
    // Predefined lists of names
    const firstNames = ["John", "Jane", "Alice", "Bob", "David", "Emily"];
    const lastNames = ["Smith", "Doe", "Johnson", "Brown", "Williams", "Jones"];

    // Function to get a random element from an array
    const getRandomElement = (array) => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };

    // Function to generate random data with meaningful full names
    const generateRandomData = () => {
      const randomAdharNo = Math.floor(
        Math.random() * 1000000000000
      ).toString();
      const randomFullName =
        getRandomElement(firstNames) + " " + getRandomElement(lastNames);
      const randomPhoneNo = Math.floor(Math.random() * 10000000000);
      const randomEmail = `farmer${Math.floor(
        Math.random() * 1000
      )}@example.com`;
      const randomAddress = "Random Address " + Math.floor(Math.random() * 100);
      const randomUsername = "username" + Math.floor(Math.random() * 1000);
      const randomPassword = "password" + Math.floor(Math.random() * 1000);
      const randomLandSize = Math.floor(Math.random() * 100);
      const randomTypeOfCrop = ["Crop1", "Crop2", "Crop3"]; // Add more crop types as needed
      const randomOtp = Math.floor(Math.random() * 10000);

      return {
        adharNo: randomAdharNo,
        fullName: randomFullName,
        phoneNo: randomPhoneNo,
        email: randomEmail,
        address: randomAddress,
        username: randomUsername,
        password: randomPassword,
        landSize: randomLandSize,
        typeOfCrop: randomTypeOfCrop,
        otp: randomOtp,
      };
    };

    // Number of documents you want to insert
    const numberOfDocuments = 10;

    // Generate and insert random data
    for (let i = 0; i < numberOfDocuments; i++) {
      const randomData = generateRandomData();
      const farmer = new Farmer(randomData);
      farmer.save();
    }
  } catch (error) {
    console.log(err);
  }
});

router.post("/warehouse", async (req, res) => {
  try {

    // Predefined lists of names, owners, cities, and tempTypes
    const names = ["Warehouse1", "Warehouse2", "Warehouse3", "Storage Hub"];
    const owners = ["Owner1", "Owner2", "Owner3", "Management"];
    const cities = ["New York", "London", "Tokyo", "Paris", "Sydney"];
    const tempTypes = ["Cool", "Frozen", "Dry"];

    // Function to get a random element from an array
    const getRandomElement = (array) => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };

    // Function to generate random data for the Warehouse schema
    const generateRandomWarehouseData = () => {
      return {
        name: getRandomElement(names),
        ownerName: getRandomElement(owners),
        username: "username" + Math.floor(Math.random() * 1000),
        password: "password" + Math.floor(Math.random() * 1000),
        city: getRandomElement(cities),
        facility: {
          temperature: {
            low: Math.floor(Math.random() * 10),
            high: Math.floor(Math.random() * 30) + 20,
          },
          capacity: Math.floor(Math.random() * 1000),
          occupancy: Math.floor(Math.random() * 500),
          tempType: getRandomElement(tempTypes),
        },
        certifications: "ISO 9001",
        security: "High",
        phoneNo: Math.floor(Math.random() * 10000000000),
        email: `warehouse${Math.floor(Math.random() * 1000)}@example.com`,
        servicesOffered: "Storage and Handling",
        price: Math.floor(Math.random() * 1000),
        otp: Math.floor(Math.random() * 10000),
        typeOfCrop: ["Crop1", "Crop2", "Crop3"],
        duration: Math.floor(Math.random() * 30),
      };
    };

    // Number of Warehouse documents you want to insert
    const numberOfWarehouses = 10;

    // Generate and insert random Warehouse data
    for (let i = 0; i < numberOfWarehouses; i++) {
      const randomWarehouseData = generateRandomWarehouseData();
      const warehouse = new Warehouse(randomWarehouseData);
      warehouse.save();
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
