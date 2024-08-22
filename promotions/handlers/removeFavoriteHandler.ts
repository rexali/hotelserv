import { PromotionService } from "../controllers/promotion.controller"
import { NextFunction, Request, Response } from "express";

export async function removePromotionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { roomId, userId } = req.params as unknown as { roomId: number, userId: number };
        const promotion = await PromotionService.removePromotion(roomId, userId);
        if (promotion !== null || undefined) {
            res.status(200).json({ status: "success", data: { promotion }, promotion: "Promotion removed" })
        } else {
            res.status(200).json({ status: "success", data: null, promotion: "Promotion remained" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, promotion: "Error: " + error })
    }
}