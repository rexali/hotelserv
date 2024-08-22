import { PromotionService } from "../controllers/promotion.controller"
import { NextFunction, Request, Response } from "express";


export async function getPromotionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id} = req.params as unknown as { id: number};
        const promotion = await PromotionService.getPromotion(id);
        if (promotion !== null) {
            res.status(200).json({ status: "success", data: { promotion }, message: "Promotion found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No promotion found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}