const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/farmer", require("./controller/farmer.controller"));
app.use("/warehouse", require("./controller/warehouse.controller"));
app.use("/customer", require("./controller/customer.controller"));
app.use('/transaction', require("./controller/transaction.controller"));
app.use('/marketplace', require("./controller/marketPlace.controller"));


app.listen(PORT, async () => {
  console.log(`Listening on the port ${PORT}`);
});