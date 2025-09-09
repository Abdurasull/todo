import { ClientError, errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
    
    try{
        
        const header = req.headers.authorization;
        if(!header) throw new ClientError("Authorization header not found", 401);
        const token = header.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.token = token;
        
        req.userId = decoded.id;
        next();
    } catch(err) {
        
        return errorHandler(err, res);
    }
}