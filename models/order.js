const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },

  street: { type: String, required: true },
  //apartment: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phone: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Order", OrderSchema);
