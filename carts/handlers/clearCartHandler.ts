
import { CartService } from "../controllers/cart.controller";
import { NextFunction, Request, Response } from "express";

export async function clearCartHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId} = req.params as unknown as {userId:number};
        const cart = await CartService.clearCart(userId);
        if (cart !== null || undefined) {
            res.status(200).json({ status: "success", data: { cart }, cart: "Cart cleared" })
        } else {
            res.status(200).json({ status: "success", data: null, cart: "No cart cleared" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, cart: "Error: " + error })
    }
}