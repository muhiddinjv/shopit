import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFeatures from "../utils/apiFeatures.js";

export const addProductController = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user.id;
  const newProduct = new Product(req.body);
  await newProduct.save();

  res.status(200).send({
    success: true,
    message: "Product created successfully!",
    newProduct,
  });
});

export const getProductsController = catchAsyncErrors(async (req, res) => {
  const resPerPage = 3;
  const productCount = await Product.countDocuments(); // num of all products in db
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  let products = await apiFeatures.query;

  res.status(200).send({
    success: true,
    count: products.length,
    productCount,
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

// -------------------------- PRODUCT REVIEWS ------------------------------
// PUT api/review/:id
export const addProductReviewController = catchAsyncErrors(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  let product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings = //add up all reviews & divide by reviews length
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).send({
    success: true,
    message: "Review added",
  });
});

// GET api/review/all
export const getProductReviewsController = catchAsyncErrors(
  async (req, res) => {
    const product = await Product.findById(req.query.id);

    res.status(200).send({
      success: true,
      count: product.reviews.length,
      reviews: product.reviews,
    });
  }
);

// DELETE api/review/:id
export const deleteProductReviewController = catchAsyncErrors(
  async (req, res) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.id.toString()
    );

    const numOfReviews = reviews.length;

    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).send({
      success: true,
      message: "Review was deleted",
    });
  }
);
