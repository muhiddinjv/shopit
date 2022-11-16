import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  forgotPasswordController,
  resetPasswordController,
  getUsersController,
  getCurrUserController,
  updateUserController,
  deleteUserController,
  updatePasswordController,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const userRouter = express.Router();

//auth routes
userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", logoutUserController);
userRouter.post("/password/forgot", forgotPasswordController);
userRouter.put("/password/reset/:token", resetPasswordController);

//user routes
userRouter.get("/user/all", getUsersController);
userRouter.get("/user/current", isAuthenticatedUser, getCurrUserController);
userRouter.put(
  "/password/update",
  isAuthenticatedUser,
  updatePasswordController
);
userRouter.put("/user/update", isAuthenticatedUser, updateUserController);
userRouter.delete("/user/delete", isAuthenticatedUser, deleteUserController);

export default userRouter;
