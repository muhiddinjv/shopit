import express from "express";
import {
  getProductsController,
  addProductController,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/addproduct", addProductController);
productRouter.get("/getproducts", getProductsController);

export default productRouter;
