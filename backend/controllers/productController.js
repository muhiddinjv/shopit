import Product from "../models/productModel.js";

export const addProductController = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).send({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};
