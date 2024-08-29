import { PromotionService } from "../controllers/promotion.controller"
import { NextFunction, Request, Response } from "express";
import { PromotionType } from "../types/types";

export async function createPromotionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as PromotionType;
        const promotionService = new PromotionService(data.id as number, data);
        const promotion = await promotionService.createPromotion();
        if (promotion !== null) {
            res.status(200).json({ status: "success", data: { promotion }, message: "Promotion created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No promotion created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}