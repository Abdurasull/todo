import express from "express";
import { userController } from "../controller/userController.js";
import auth from "../middleware/auth.js";
    
export const authRouter = express.Router();


authRouter.post("/register", userController.register);
authRouter.post("/login", userController.login);