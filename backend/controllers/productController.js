import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const addProductController = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();

  res.status(200).send({
    success: true,
    message: "Product created successfully!",
    newProduct,
  });
};

export const getProductsController = async (req, res) => {
  const products = await Product.find();

  res.status(200).send({
    success: true,
    count: products.length,
    products,
  });
};

export const getProductController = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).send({
    success: true,
    product,
  });
};

export const updateProductController = async (req, res) => {
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
};

export const deleteProductController = async (req, res) => {
  const product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).send({
    success: true,
    message: "Product was deleted",
  });
};

// export const deleteProductController = async (req, res) => {
//   Product.findOneAndDelete({ _id: req.params.id })
//     .then((product) => {
//       if (!product) {
//         res.status(400).send({
//           success: false,
//           message: "Product was not found!",
//         });
//       } else {
//         res.status(200).send({
//           success: true,
//           message: "Product was deleted!",
//         });
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// };
