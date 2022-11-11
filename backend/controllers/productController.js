import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFeatures from "../utils/apiFeatures.js";

export const addProductController = catchAsyncErrors(async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();

  res.status(200).send({
    success: true,
    message: "Product created successfully!",
    newProduct,
  });
});

export const getProductsController = catchAsyncErrors(async (req, res) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();
  const products = await apiFeatures.query;

  res.status(200).send({
    success: true,
    count: products.length,
    products,
  });
});

export const getProductController = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).send({
    success: true,
    product,
  });
});

export const updateProductController = catchAsyncErrors(async (req, res) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).send({
    success: true,
    product,
  });
});

export const deleteProductController = catchAsyncErrors(async (req, res) => {
  const product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).send({
    success: true,
    message: "Product was deleted",
  });
});
