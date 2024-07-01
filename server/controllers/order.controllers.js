import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = new Order({
      ...req.body,
    });

    await newOrder.save();
    res.status(200).send("order has been added");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const updatedStatus = await Order.findOneAndUpdate(
      { 'orders._id': req.params.orderId },
      { $set: {"orders.$.status" : req.body.status} },
      { new: true }
    );

    res.status(200).json(updatedStatus);
  } catch (error) {
    next(error);
  }
};

export const updateOrders = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      {"orders._id":req.params.orderId},
      { $push: {"orders.$.items": {$each: req.body.items}} },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
