const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: String,
  image: String,
  color: String,
});

module.exports = mongoose.model("Category", CategorySchema);
