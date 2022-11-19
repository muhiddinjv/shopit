import Order from "../models/orderModel.js";
// import Product from "../models/productModel.js";
// import ErrorHandler from "../utils/errorHandler.js";
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

  // sendToken(newOrder, 200, res);
});
