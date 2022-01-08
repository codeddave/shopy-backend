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

const createOrder = async (req, res, next) => {
  const {
    shippingAddress1,
    shippingAddress2,
    street,
    zip,
    city,
    country,
    phone,
    user,
  } = req.body;

  try {
    const order = await Order.create({
      shippingAddress1,
      shippingAddress2,
      street,
      zip,
      city,
      country,
      phone,
      user,
    });

    res.status(201).json(order);
  } catch (error) {
    return next(new HttpError(error.message, 409));
  }
};

exports.getOrders = getOrders;
exports.createOrder = createOrder;
