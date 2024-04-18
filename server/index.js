const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/generate",require("./controller/generate.controller"))

app.use("/farmer", require("./controller/farmer.controller"));
app.use("/cartItems", require("./controller/cartItem.controller"));
app.use("/warehouse", require("./controller/warehouse.controller"));
app.use("/customer", require("./controller/customer.controller"));
app.use("/transaction", require("./controller/transaction.controller"));

app.listen(PORT, async () => {
  console.log(`Listening on the port ${PORT}`);
});
