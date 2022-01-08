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
    required: true,
  },

  street: { type: String, required: true },
  //apartment: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
