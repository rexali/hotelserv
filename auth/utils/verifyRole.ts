import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function verifyRole(req: Request, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers["authorization"] as string;
        const token = bearerToken?.split(" ")[1] ?? "";
        if (!token) {
            return false;
        } else {
            const decoded = jwt.verify(token, process.env['SECRET_KEY'] as string) as { userId: number, role: string, permission: [string] };
            if (decoded.role === "admin" && decoded.permission.includes("write")) {
                next();
            } else {
                res.status(401).json({ status: "failure", data: null, message: "Unauthorised" })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "failure", data: null, message: "Error: "+error })
    }
}