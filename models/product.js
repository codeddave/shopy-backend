const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  images: [String],
  description: { type: String, required: true },
  richDescription: { type: String, default: "" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

  numberInStock: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
