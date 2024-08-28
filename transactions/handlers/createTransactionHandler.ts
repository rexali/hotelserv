import { TransactionService } from "../controllers/transaction.controller"
import { NextFunction, Request, Response } from "express";
import { TransactionType } from "../types/types";

export async function createTransactionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as TransactionType;
        const transactionService = new TransactionService(data.id,data);
        const transaction = await transactionService.createTransaction();
        if (transaction !== null) {
            res.status(200).json({ status: "success", data: { transaction }, message: "Transaction created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No transaction created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}