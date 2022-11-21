import express from "express";
import {
  getProductsController,
  getProductController,
  addProductController,
  deleteProductController,
  updateProductController,
  addProductReviewController,
  getProductReviewsController,
  deleteProductReviewsController,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.get("/products", getProductsController);
productRouter.get("/products/:id", getProductController);
productRouter.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  addProductController
);
productRouter.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProductController
);
productRouter.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProductController
);

productRouter.get("/review/:id", getProductReviewsController);
productRouter.put("/review", isAuthenticatedUser, addProductReviewController);
productRouter.delete("/review/:id", deleteProductReviewsController);

export default productRouter;
