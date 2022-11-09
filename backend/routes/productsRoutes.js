import express from "express";
import {
  getProductsController,
  getProductController,
  addProductController,
  deleteProductController,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/addproduct", addProductController);
productRouter.get("/getproducts", getProductsController);
productRouter.get("/getproduct/:id", getProductController);
productRouter.delete("/deleteproduct/:id", deleteProductController);

export default productRouter;
