import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";
// import Product from "../models/productModel.js";
// import sendToken from "../utils/jwtToken.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const createOrderController = catchAsyncErrors(async (req, res) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const newOrder = new Order({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  await newOrder.save();

  res.status(200).send({
    success: true,
    newOrder,
  });
});

export const getOrderController = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).send({
    success: true,
    order,
  });
});

export const getMyOrdersController = catchAsyncErrors(
  async (req, res, next) => {
    const myorders = await Order.find({ user: req.user.id });

    if (!myorders) {
      return next(new ErrorHandler("No order found with this ID", 404));
    }

    res.status(200).send({
      success: true,
      count: myorders.length,
      myorders,
    });
  }
);

export const getOrdersController = catchAsyncErrors(async (req, res) => {
  const allorders = await Order.find();

  let totalAmount = 0;
  allorders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).send({
    success: true,
    count: allorders.length,
    totalAmount,
    allorders,
  });
});
