
import { CartService } from "../controllers/cart.controller"
import { NextFunction, Request, Response } from "express";


export async function removeCartHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { roomId, userId } = req.params as unknown as { roomId: number, userId: number };
        const cart = await CartService.removeCart(roomId, userId);
        if (cart !== null || undefined) {
            res.status(200).json({ status: "success", data: { cart }, cart: "Cart removed " })
        } else {
            res.status(200).json({ status: "success", data: null, cart: "No cart removed" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, cart: "Error: " + error })
    }

}