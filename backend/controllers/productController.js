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

export const updateProductController = async (req, res) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send({
      success: false,
      message: "Product not found!",
    });
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
  Product.findOneAndDelete({ _id: req.params.id })
    .then((product) => {
      if (!product) {
        res.status(400).send({
          success: false,
          message: "Product was not found!",
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Product was deleted!",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
};
