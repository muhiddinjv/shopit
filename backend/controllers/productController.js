const { Product } = require("../models/product");

//create a new product => /api/v1/product/new
exports.newProduct = async (req, res, next) => {
  const {
    name,
    price,
    description,
    ratings,
    images,
    category,
    seller,
    stock,
    numOfReviews,
    reviews,
  } = req.body;
  // await Product.ready();

  // const product = await Product?.create(req.body);

  res.status(201).json({
    success: true,
    message: "This route will add a new product to database",
    name,
    price,
    description,
    ratings,
    images,
    category,
    seller,
    stock,
    numOfReviews,
    reviews,
  });
};

exports.getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "This route will show all the products in database",
  });
};
