const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  pasword: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
    select: false,
  },
  phone: Number,
});

module.exports = mongoose.model("User", UserSchema);
