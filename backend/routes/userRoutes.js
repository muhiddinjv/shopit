import express from "express";
import {
  getUsersController,
  getCurrUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const userRouter = express.Router();

//user routes
userRouter.get("/getusers", getUsersController);
userRouter.get("/getcurruser", isAuthenticatedUser, getCurrUserController);
userRouter.put("/updateuser/:id", isAuthenticatedUser, updateUserController);
userRouter.delete("/deleteuser/:id", isAuthenticatedUser, deleteUserController);

export default userRouter;
