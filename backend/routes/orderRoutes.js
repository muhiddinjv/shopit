import express from "express";
import {
  createOrderController,
  getMyOrdersController,
  getOrderController,
  // getProductController,
  // deleteProductController,
  // updateProductController,
} from "../controllers/orderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/order/new", isAuthenticatedUser, createOrderController);
orderRouter.get("/orders/me", isAuthenticatedUser, getMyOrdersController);
orderRouter.get("/order/:id", isAuthenticatedUser, getOrderController);
// orderRouter.get("/products/:id", getProductController);
// orderRouter.put(
//   "/admin/product/:id",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   updateProductController
// );

export default orderRouter;
