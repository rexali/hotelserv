import { PromotionService } from "../controllers/promotion.controller"
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";


export async function createPromotionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        // get transaction data
        const transactionData = {
            amount: data.amount,
            type: data.type, //"credit",
            status: data.status ?? "pending",
            description: data.description ?? "promotion",
            category: "promotion",
            ref: uuidv4(),
            promotionId: data.promotionId,
        }

        // get promotionData
        const promotionData = {
            RoomId: data.RoomId,
            UserId: data.UserId,
            name: data.name,
            endDate: data.endDate,
            startDate: data.startDate,
            description: data.description,
            minPurchase: data.minPurchase,
            maxPurchase: data.maxPurchase,
            status: data.status ?? "pending"
        }

        const promotion = await PromotionService.createPromotion(promotionData, transactionData);

        if (promotion !== null) {

            res.status(200).json({ status: "success", data: { promotion }, message: "Promotion created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No promotion created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}