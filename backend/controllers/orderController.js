import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
// import Product from "../models/productModel.js";
// import sendToken from "../utils/jwtToken.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

//POST api/order/new
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

//GET api/order/:id
export const getOrderController = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).send({
    success: true,
    order,
  });
});

//GET api/orders/me
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

//GET api/admin/orders
export const getOrdersController = catchAsyncErrors(async (req, res) => {
  const allOrders = await Order.find();

  let totalAmount = 0;
  allOrders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).send({
    success: true,
    count: allOrders.length,
    totalAmount,
    allOrders,
  });
});

//PUT api/admin/order/:id
export const updateOrderController = catchAsyncErrors(
  async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    // if (order.orderStatus === "Delivered") {
    //   return next(
    //     new ErrorHandler("You have already delivered this order", 400)
    //   );
    // }

    order.orderItems.find(async (item) => {
      // const productId = JSON.stringify(item._id).replace(/"/g, "");
      await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).send({
      success: true,
      message: "Product status updated",
    });
  }
);

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// DELETE api/admin/order/:id
export const deleteOrderController = catchAsyncErrors(
  async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(new ErrorHandler("No order found with this ID", 404));
    }

    res.status(200).send({
      success: true,
      message: "Order deleted",
    });
  }
);
