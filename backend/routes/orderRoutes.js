import express from "express";
import {
  createOrderController,
  getMyOrdersController,
  getOrderController,
  getOrdersController,
  // getProductController,
  // deleteProductController,
  // updateProductController,
} from "../controllers/orderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/order/new", isAuthenticatedUser, createOrderController);
orderRouter.get("/order/:id", isAuthenticatedUser, getOrderController);
orderRouter.get("/orders/me", isAuthenticatedUser, getMyOrdersController);
orderRouter.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getOrdersController
);
// orderRouter.get("/products/:id", getProductController);
// orderRouter.put(
//   "/admin/product/:id",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   updateProductController
// );

export default orderRouter;
