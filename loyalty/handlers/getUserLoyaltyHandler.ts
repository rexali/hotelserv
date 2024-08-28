import { LoyaltyService } from "../controllers/loyalty.controller"
import { NextFunction, Request, Response } from "express";
import { LoyaltyType } from "../types/types";


export async function getUserLoyaltyHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {userId, page } = req.params as unknown as {userId:number, page:number};
        const loyalty = await LoyaltyService.getUserLoyalties(userId,page) as unknown as LoyaltyType[];
        if (loyalty !== null) {
            res.status(200).json({ status: "success", data: { loyalty }, message: "Loyalty created"});
        } else {
            res.status(200).json({ status: "success", data: null, message: "No loyalty created" });
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}