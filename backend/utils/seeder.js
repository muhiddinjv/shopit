import Product from "../models/productModel.js";
import products from "../data/products.json" assert { type: "json" };
import connectdb from "./connectdb.js";

connectdb();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
