import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { ClientError, errorHandler, responseHandler } from "../utils/error.js";
import { comparePassword, hashPassword } from "../utils/hash.js";

export const userController = {
    register: async (req, res) => {
        try {
            const { fullname, email, password } = req.body;
            
            if (!email || !password) throw new ClientError("gmail and password are required", 400);
            const existing = await User.findOne({ email });
            if (existing) throw new ClientError("User already exists", 400);
            const hashed = await hashPassword(password);
            const user = new User({
                fullname,
                email,
                password: hashed
            });
            
            
            await user.save();
            return responseHandler({ status: 201, message: "User created successfully", data: null }, res);

        } catch (err) {
            errorHandler(err, res);
        }
    },
    login: async (req, res) => {
        try{
            
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(!user) throw new ClientError("User not found", 404);
            const ok = await comparePassword(password, user.password);
            if(!ok) throw new ClientError("Invalid password", 401);
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            
            responseHandler({ status: 200, message: "Login successful", data: { token } }, res);
            
        } catch (err) {
            errorHandler(err, res);
        }
    }
};
