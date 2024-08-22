import csrf from "csrf-token";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export async function createCsrfProtection(req: Request, res: Response, next: NextFunction) {
    try {
        const token = await csrf.create(process.env["SECRET_KEY"] as string, 8);
        res.status(401).json({ status: "success", data: {token}, message: "Valid token" });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error })
    }
}

export async function verifyCsrfProtection(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body
    try {
        if (await csrf.verify(process.env["SECRET_KEY"] as string, token)) {
            next()
        } else {
            res.status(401).json({ status: "fail", data: null, message: "Invalid token" })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error })
    }
} 

