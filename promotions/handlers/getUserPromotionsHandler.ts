import { PromotionService } from "../controllers/promotion.controller"
import { NextFunction, Request, Response } from "express";


export async function getUserPromotionsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number }
        const { userId } = req.params as unknown as { userId: number }
        const promotions = await PromotionService.getUserPromotions(userId, page);
        if (promotions !== null) {
            res.status(200).json({ status: "success", data: { promotions }, message: "Promotion found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No promotions found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}