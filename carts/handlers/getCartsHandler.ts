import { CartService } from "../controllers/cart.controller"
import { NextFunction, Request, Response } from "express";


export async function getCartsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params as unknown as { userId: number };
        const { page } = req.query as unknown as { page: number };

        const cart = await CartService.getCarts(userId, page);
        if (cart !== null) {
            res.status(200).json({ status: "success", data: { cart }, message: "Cart found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No cart found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}