import express from "express";
import {
  createOrderController,
  getMyOrdersController,
  getOrderController,
  getOrdersController,
  updateOrderController,
  deleteOrderController,
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
orderRouter.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrderController
);
orderRouter.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrderController
);

export default orderRouter;
