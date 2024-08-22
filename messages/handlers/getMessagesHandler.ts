
import { MessageService } from "../controllers/message.controller"
import { NextFunction, Request, Response } from "express";

export async function getMessagesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const page = req.query?.page as unknown as number ?? 1;
        const messages = await MessageService.getMessages(page);
        if (messages !== null || undefined) {
            res.status(200).json({ status: "success", data: { messages }, message: "Messages found " })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No message(s) found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}