import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  forgotPasswordController,
  resetPasswordController,
  getUsersController,
  getUserDetailsController,
  getCurrUserController,
  updateProfileController,
  deleteUserController,
  updateUserController,
  updatePasswordController,
} from "../controllers/userController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const userRouter = express.Router();

//auth routes
userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", logoutUserController);
userRouter.post("/password/forgot", forgotPasswordController);
userRouter.put("/password/reset/:token", resetPasswordController);

//user routes
userRouter.get("/user/current", isAuthenticatedUser, getCurrUserController);
userRouter.put(
  "/password/update",
  isAuthenticatedUser,
  updatePasswordController
);
userRouter.put("/user/update", isAuthenticatedUser, updateProfileController);
userRouter.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getUsersController
);
userRouter.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getUserDetailsController
);
userRouter.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUserController
);
userRouter.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUserController
);

export default userRouter;
