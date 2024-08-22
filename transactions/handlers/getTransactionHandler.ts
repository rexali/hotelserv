import { TransactionService } from "../controllers/transaction.controller"
import { NextFunction, Request, Response } from "express";
import { TransactionType } from "../types/types";

export async function getTransactionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params as unknown as {id:number};
        const transaction = await TransactionService.getTransaction(id) as Partial<TransactionType>;
        if (transaction !== null || undefined) {
            res.status(200).json({ status: "success", data: { transaction }, message: "Transaction update" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No transaction update" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}