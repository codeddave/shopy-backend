const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandlerMiddleware");
const userRoutes = require("./routes/userRoutes");
const authJwt = require("./utils/jwt");

const app = express();

app.use(authJwt());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.use("/", (req, res) => {
  res.send("Welcome to the Shopy Api");
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`app started on port ${PORT}`));
  })
  .catch((error) => console.log(error));
