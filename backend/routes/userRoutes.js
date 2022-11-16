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
userRouter.post("/forgotpass", forgotPasswordController);
userRouter.put("/resetpass/:token", resetPasswordController);

//user routes
userRouter.get("/getusers", getUsersController);
userRouter.get("/getcurruser", isAuthenticatedUser, getCurrUserController);
userRouter.put("/updatepass", isAuthenticatedUser, updatePasswordController);
userRouter.put("/updateuser/:id", isAuthenticatedUser, updateUserController);
userRouter.delete("/deleteuser/:id", isAuthenticatedUser, deleteUserController);

export default userRouter;
