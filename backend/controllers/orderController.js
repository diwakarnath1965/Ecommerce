import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";

//Create a new order => /api/v1/orders/new
export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get current user order => /api/v1/me/orders
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get order details => /api/v1/order/:id
export const getOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get all orders => /api/v1/admin/orders

export const allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

//Update / Process order => /api/v1/admin/order/:id

export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  //update stock
  order?.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());

    if (!product) {
      return next(new ErrorHandler("Product not found with this ID", 404));
    }

    product.stock = product.stock - item.quantity;
    await product.save({validateBeforeSave: false});
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

//Delete order => /api/v1/admin/order/:id

export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
