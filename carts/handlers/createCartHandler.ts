import { CartService } from "../controllers/cart.controller"
import { NextFunction, Request, Response } from "express";
import { CartType } from "../types/types";


export async function createCartHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as CartType;
        const cartService = new CartService(data.id, data);
        const cart = await cartService.createCart();
        if (cart !== null) {
            res.status(200).json({ status: "success", data: { cart }, message: "Cart created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No cart created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}