import { TransactionService } from "../controllers/transaction.controller"
import { NextFunction, Request, Response } from "express";

export async function getUserTransactionsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number };
        const { userId } = req.params as unknown as { userId: number }
        const transactions = await TransactionService.getUserTransactions(userId,page);
        if (transactions !== null) {
            res.status(200).json({ status: "success", data: { transactions }, message: "Transaction found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No transaction found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}