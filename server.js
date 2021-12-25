const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandlerMiddleware");
const app = express();

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/", (req, res) => {
  res.send("Welcome to the Shopy Api");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`app started on port ${PORT}`));
