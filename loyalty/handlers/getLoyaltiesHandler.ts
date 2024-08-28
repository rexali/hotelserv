import { LoyaltyService } from "../controllers/loyalty.controller"
import { NextFunction, Request, Response } from "express";
import { LoyaltyType } from "../types/types";


export async function getLoyaltiesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {page } = req.params as unknown as {userId:number, page:number};
        const loyalties = await LoyaltyService.getLoyalties(page) as unknown as LoyaltyType[];
        if (loyalties !== null) {
            res.status(200).json({ status: "success", data: { loyalties }, message: "Loyalty collected"});
        } else {
            res.status(200).json({ status: "success", data: null, message: "No loyalty found" });
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}