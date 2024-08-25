import { WalletService } from "../controllers/wallet.controller"
import { NextFunction, Request, Response } from "express";
import { WalletType } from "../types/types";

export async function getWalletsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number };
        const wallets = await WalletService.getWallets(page) as unknown as Array<WalletType>;
        if (wallets !== null) {
            res.status(200).json({ status: "success", data: { wallets }, message: "Wallet found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No wallet found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}