/* map card details
    Card details 
    left side : 
      todo : Image {Nextui}
    right side :
      div
        todo : User {Nextui} 
        {
          name : name
          description : ownerName
          avatarProps : {{
            src : image
          }}
        }
        todo : facility {Nextui Chip}
        todo : capacity {Nextui Chip}
        todo : security 
        todo : contact {Nextui openmenu}
      div
      div (footer)
        todo : price
        todo : duration {Nextui slider}
      div

*/

/*  
      name: "Warehouse1",
      ownerName: "Owner1",
      username: "username346",
      city: "New York",
      facility: {
        temperature: {
          low: 1,
          high: 40,
        },
        capacity: 290,
        occupancy: 384,
        tempType: "Dry",
      },
*/


const warehouseDetailData = [
  {
    "_id": {
      "$oid": "65ba84981c2c2ee035fa6489"
    },
    "name": "Warehouse1",
    "ownerName": "Owner1",
    "username": "username346",
    "password": "password389",
    "city": "New York",
    "facility": {
      "temperature": {
        "low": 1,
        "high": 40
      },
      "capacity": 290,
      "occupancy": 384,
      "tempType": "Dry"
    },
    "certifications": "ISO 9001",
    "security": "High",
    "phoneNo": 2156636864,
    "email": "warehouse537@example.com",
    "servicesOffered": "Storage and Handling",
    "price": 372,
    "otp": 8397,
    "image": "/images/warehouse_1.jpg",
    "location": [
      40.7128,
      -74.0060
    ],
    "typeOfCrop": [
      "Crop1",
      "Crop2",
      "Crop3"
    ],
    "duration": 25,
    "__v": 0
  },
  {
    "_id": {
      "$oid": "65ba84981c2c2ee035fa648a"
    },
    "name": "Warehouse2",
    "ownerName": "Owner1",
    "username": "username662",
    "password": "password292",
    "city": "Paris",
    "facility": {
      "temperature": {
        "low": 7,
        "high": 22
      },
      "capacity": 410,
      "occupancy": 3,
      "tempType": "Frozen"
    },
    "certifications": "ISO 9001",
    "security": "High",
    "phoneNo": 5639960901,
    "email": "warehouse274@example.com",
    "servicesOffered": "Storage and Handling",
    "price": 668,
    "otp": 7434,
    "image": "/images/warehouse_1.jpg",
    "location": [
      49.8566,
      3.3522
    ],
    "typeOfCrop": [
      "Crop1",
      "Crop2",
      "Crop3"
    ],
    "duration": 17,
    "__v": 0
  },
  {
    "_id": {
      "$oid": "65ba84981c2c2ee035fa648b"
    },
    "name": "Warehouse3",
    "ownerName": "Owner2",
    "username": "username148",
    "password": "password446",
    "city": "New York",
    "facility": {
      "temperature": {
        "low": 0,
        "high": 34
      },
      "capacity": 11,
      "occupancy": 29,
      "tempType": "Dry"
    },
    "certifications": "ISO 9001",
    "security": "High",
    "phoneNo": 5483297463,
    "email": "warehouse984@example.com",
    "servicesOffered": "Storage and Handling",
    "price": 525,
    "otp": 8894,
    "image": "/images/warehouse_1.jpg",
    "location": [
      41.7128,
      -75.0060
    ],
    "typeOfCrop": [
      "Crop1",
      "Crop2",
      "Crop3"
    ],
    "duration": 1,
    "__v": 0
  },
  {
    "_id": {
      "$oid": "65ba84981c2c2ee035fa648e"
    },
    "name": "Storage Hub",
    "ownerName": "Management",
    "username": "username595",
    "password": "password347",
    "city": "Paris",
    "facility": {
      "temperature": {
        "low": 3,
        "high": 41
      },
      "capacity": 510,
      "occupancy": 439,
      "tempType": "Cool"
    },
    "certifications": "ISO 9001",
    "security": "High",
    "phoneNo": 6519429735,
    "email": "warehouse608@example.com",
    "servicesOffered": "Storage and Handling",
    "price": 710,
    "otp": 5910,
    "image": "/images/warehouse_1.jpg",
    "location": [
      21.11,79.008
    ],
    "typeOfCrop": [
      "Crop1",
      "Crop2",
      "Crop3"
    ],
    "duration": 14,
    "__v": 0
  },
  {
    "_id": {
      "$oid": "65ba84981c2c2ee035fa648f"
    },
    "name": "Warehouse4",
    "ownerName": "Owner2",
    "username": "username478",
    "password": "password589",
    "city": "London",
    "facility": {
      "temperature": {
        "low": 8,
        "high": 29
      },
      "capacity": 975,
      "occupancy": 317,
      "tempType": "Frozen"
    },
    "certifications": "ISO 9001",
    "security": "High",
    "phoneNo": 412617922,
    "email": "warehouse983@example.com",
    "servicesOffered": "Storage and Handling",
    "price": 48,
    "otp": 1174,
    "image": "/images/warehouse_1.jpg",
    "location": [
      21,79
    ],
    "typeOfCrop": [
      "Crop1",
      "Crop2",
      "Crop3"
    ],
    "duration": 2,
    "__v": 0
  }
]

export default warehouseDetailData;