import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.get("/logout", logoutUserController);
authRouter.post("/forgotpass", forgotPasswordController);
authRouter.put("/resetpass/:token", resetPasswordController);

export default authRouter;
