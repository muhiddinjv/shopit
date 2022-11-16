import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  forgotPasswordController,
  resetPasswordController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", logoutUserController);
userRouter.post("/forgotpass", forgotPasswordController);
userRouter.put("/resetpass/:token", resetPasswordController);
userRouter.get("/getusers", getUsersController);
userRouter.get("/getuser/:id", getUserController);
userRouter.put("/updateuser/:id", updateUserController);
userRouter.delete("/deleteuser/:id", deleteUserController);

export default userRouter;
