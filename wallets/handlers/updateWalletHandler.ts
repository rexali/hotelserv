import { WalletService } from "../controllers/wallet.controller"
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export async function updateWalletHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        // get transaction data
        const transactionData = {
            amount: data.amount,
            type: data.type, //"credit",
            status: "pending",
            description: data.description, // "deposit",
            category: "wallet",
            ref: uuidv4(),
            WalletId: data.walletId,
        }

        const wallet = await WalletService.updateWallet(data.walletId, transactionData) as any;

        if (wallet !== null) {

            if (wallet[0] === 1) {
                res.status(200).json({ status: "success", data: { affectedCount: wallet[0] }, message: "Wallet updated" })

            } else {
                
                res.status(200).json({ status: "success", data: null, message: wallet.message })
            }

        } else {
            res.status(200).json({ status: "success", data: null, message: "No wallet update occur" })
        }

    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}