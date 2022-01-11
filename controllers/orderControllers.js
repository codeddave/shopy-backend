const HttpError = require("../models/httpError");
const Order = require("../models/order");

const OrderItem = require("../models/orderItem");

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name")
      .populate({ path: "orderItems", populate: "product" });

    //get just namme of user
    //const orders = await Order.find().populate("user", 'name');
    //sort orders by date
    //const orders = await Order.find().populate("user", 'name').sort('dateOrdered);

    //sort from newest to oldest
    //const orders = await Order.find().populate("user", 'name').sort({'dateOrdered: -1});
    res.status(200).json(orders);
  } catch (error) {
    return next(new HttpError(error.message, 404));
  }
};
const getOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate("user", "name")
      .populate({ path: "orderItems", populate: "product" });

    res.status(200).json(order);
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
      const newOrderItem = await OrderItem.create({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      return newOrderItem._id;
    })
  );

  const orderItemIdsResolved = await orderItemIds;

  const totalPricesOfItems = await Promise.all(
    orderItemIdsResolved.map(async (item) => {
      const orderItem = await OrderItem.findById(item).populate("product");
      const totalPrice = orderItem.product.price * orderItem.product.quantity;
      return totalPrice;
    })
  );

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

const updateOrder = async (req, res, next) => {
  const { id: _id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No order with that id");
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      _id,
      {
        status,
      },
      { new: true }
    );

    res.status(201).json(updatedOrder);
  } catch (error) {
    return next(new HttpError(error.message, 409));
  }
};
const deleteOrder = async (req, res, next) => {
  const { id: _id } = req.params;

  try {
    const order = await Order.findByIdAndRemove(_id);

    if (order) {
      order.orderItems.map(async (itemId) => {
        await OrderItem.findByIdAndRemove(itemId);
      });
      return res.status(200).json({ message: "order deleted successfully" });
    } else {
      return next(new HttpError("order not found", 404));
    }
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteOrder = deleteOrder;
exports.getOrders = getOrders;
exports.getOrder = getOrder;

exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
