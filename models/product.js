const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  richDescription: { type: String, default: "" },
  numberInStock: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
