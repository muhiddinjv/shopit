import Product from "../models/productModel.js";

export const addProductController = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).send({
      success: true,
      message: "Product created successfully!",
      newProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductController = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send({
      success: false,
      message: "Product not found!",
    });
  }

  res.status(200).send({
    success: true,
    product,
  });
};

export const deleteProductController = async (req, res) => {
  try {
    await Product.findOneAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Product deleted!",
    });
  } catch (error) {
    console.log(error);
  }
};
