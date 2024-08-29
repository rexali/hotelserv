import { LoyaltyService } from "../controllers/loyalty.controller"
import { NextFunction, Request, Response } from "express";
import { LoyaltyType } from "../types/types";


export async function updateLoyaltyHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as LoyaltyType;
        const loyaltyService = new LoyaltyService(data.id, data);
        const loyalty = await loyaltyService.updateLoyalty();
        if (loyalty !== null) {
            res.status(200).json({ status: "success", data: { loyalty }, message: "Loyalty created"});
        } else {
            res.status(200).json({ status: "success", data: null, message: "No loyalty created" });
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}