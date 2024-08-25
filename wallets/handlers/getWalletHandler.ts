import { WalletService } from "../controllers/wallet.controller"
import { NextFunction, Request, Response } from "express";
import { WalletType } from "../types/types";

export async function getWalletHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params as unknown as {id:number};
        const wallet = await WalletService.getWallet(id) as unknown as WalletType;
        if (wallet !== null || undefined) {
            res.status(200).json({ status: "success", data: { wallet }, message: "Wallet found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No wallet found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}