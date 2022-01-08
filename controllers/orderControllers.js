const HttpError = require("../models/httpError");
const Order = require("../models/order");

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    return next(new HttpError(error.message, 404));
  }
};

module.exports = getOrders;
