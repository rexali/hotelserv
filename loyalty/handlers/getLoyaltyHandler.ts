import { LoyaltyService } from "../controllers/loyalty.controller"
import { NextFunction, Request, Response } from "express";
import { LoyaltyType } from "../types/types";


export async function getLoyaltyHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params as unknown as {id:number};
        const loyalty = await LoyaltyService.getLoyalty(id) as unknown as LoyaltyType;
        if (loyalty !== null) {
            res.status(200).json({ status: "success", data: { loyalty }, message: "Loyalty found"});
        } else {
            res.status(200).json({ status: "success", data: null, message: "No loyalty found" });
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}