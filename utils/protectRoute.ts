import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {

    try {
        const bearerToken = req.headers["authorization"] as string;
        const token = bearerToken?.split(" ")[1] ?? "";
        if (!token) {
            res.status(401).json({ status: "success", data: null, message: "Access denied" });
        }else{
            const decoded = jwt.verify(token, process.env['SECRET_KEY'] as string);
            req.user = decoded;
            next()
        }
    } catch (error) {
        res.status(401).json({ status: "fail", data: null, message: "Invalid token: "+error });
    }
}