const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  images: [String],
  description: { type: String, required: true },
  richDescription: { type: String, default: "" },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  brand: { type: String, default: "" },
  numberInStock: { type: Number, required: true, min: 0 },
  rating: { type: Number },
  reviewsNumber: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
});

ProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ProductSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Product", ProductSchema);
