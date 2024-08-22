
import { MessageService } from "../controllers/message.controller"
import { NextFunction, Request, Response } from "express";


export async function removeMessageHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as {id:number};
        const message = await MessageService.removeMessage(id);
        if (message !== null || undefined) {
            res.status(200).json({ status: "success", data: { message }, message: "Message removed " })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No message deleted" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}