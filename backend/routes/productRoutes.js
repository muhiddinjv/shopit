import express from "express";
import {
  getProductsController,
  getProductController,
  addProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.get("/getproducts", getProductsController);
productRouter.get("/getproduct/:id", getProductController);
productRouter.post(
  "/admin/addproduct",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  addProductController
);
productRouter.put(
  "/admin/updateproduct/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProductController
);
productRouter.delete(
  "/admin/deleteproduct/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProductController
);

export default productRouter;
