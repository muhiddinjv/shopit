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

productRouter.get("/getproducts", getProductsController);
productRouter.get("/getproduct/:id", getProductController);
productRouter.post(
  "/admin/addproduct",
  isAuthenticatedUser,
  addProductController
);
productRouter.delete(
  "/admin/deleteproduct/:id",
  isAuthenticatedUser,
  deleteProductController
);
productRouter.put(
  "/admin/updateproduct/:id",
  isAuthenticatedUser,
  updateProductController
);

export default productRouter;
