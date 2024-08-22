import { TransactionService } from "../controllers/transaction.controller"
import { NextFunction, Request, Response } from "express";
import { TransactionType } from "../types/types";

export async function getTransactionsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {page} = req.query as unknown as {page:number};
        const transactions = await TransactionService.getTransactions(page);
        if (transactions !== null) {
            res.status(200).json({ status: "success", data: { transactions }, message: "Transaction found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No transaction found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}