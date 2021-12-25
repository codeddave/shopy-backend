const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
