import { LoyaltyService } from "../controllers/loyalty.controller"
import { NextFunction, Request, Response } from "express";


export async function removeLoyaltyHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.params as unknown as { userId: number, page: number };
        const loyalty = await LoyaltyService.removeLoyalty(page);
        if (loyalty !== null) {
            res.status(200).json({ status: "success", data: { loyalty }, message: "Loyalty collected" });
        } else {
            res.status(200).json({ status: "success", data: null, message: "No loyalty found" });
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}