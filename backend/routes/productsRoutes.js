import express from "express";
import {
  getProductsController,
  getProductController,
  addProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.get("/getproducts", isAuthenticatedUser, getProductsController);
productRouter.get("/getproduct/:id", getProductController);
productRouter.post("/admin/addproduct", addProductController);
productRouter.delete("/admin/deleteproduct/:id", deleteProductController);
productRouter.put("/admin/updateproduct/:id", updateProductController);

export default productRouter;
