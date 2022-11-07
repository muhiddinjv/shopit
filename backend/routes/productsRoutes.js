import express from "express";
import {
  getProductsController,
  getProductController,
  addProductController,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/addproduct", addProductController);
productRouter.get("/getproducts", getProductsController);
productRouter.get("/getproduct/:id", getProductController);

export default productRouter;
