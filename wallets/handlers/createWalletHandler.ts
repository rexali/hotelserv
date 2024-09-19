import { WalletService } from "../controllers/wallet.controller"
import { NextFunction, Request, Response } from "express";

export async function createWalletHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body
        const walletService = new WalletService(data);
        const wallet = await walletService.createWallet();
        if (wallet !== null) {
            res.status(200).json({ status: "success", data: { wallet }, message: "Wallet created" });
        } else {
            res.status(200).json({ status: "success", data: null, message: "No wallet created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}