const HttpError = require("../models/httpError");
const Order = require("../models/order");

const OrderItem = require("../models/orderItem");

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
    orderItems,
  } = req.body;

  const orderItemIds = Promise.all(
    orderItems.map(async (orderItem) => {
      const newOrderItem = await Order.create({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      return newOrderItem._id;
    })
  );

  const orderItemIdsResolved = await orderItemIds;
  console.log(orderItemIds);
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
      orderItems: orderItemIdsResolved,
    });

    res.status(201).json(order);
  } catch (error) {
    return next(new HttpError(error.message, 409));
  }
};

exports.getOrders = getOrders;
exports.createOrder = createOrder;
