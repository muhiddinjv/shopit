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
  authorizeRoles("admin"),
  isAuthenticatedUser,
  addProductController
);
productRouter.delete(
  "/admin/deleteproduct/:id",
  authorizeRoles("admin"),
  isAuthenticatedUser,
  deleteProductController
);
productRouter.put(
  "/admin/updateproduct/:id",
  authorizeRoles("admin"),
  isAuthenticatedUser,
  updateProductController
);

export default productRouter;
