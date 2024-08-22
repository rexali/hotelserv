
import { MessageService } from "../controllers/message.controller"
import { NextFunction, Request, Response } from "express";
import { MessageType } from "../types/types";
import { sendMail } from "../../utils/sendMail";

export async function createMessageHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, ...rest } = req.body as MessageType;
        const mesaageService = new MessageService(id as number, rest);
        const message = await mesaageService.createMessage() as unknown as MessageType;
        if (message !== null || undefined) {
            if (await sendMail(
                message.recipient,
                message.title,
                "text",
                message.sender,
                "",
                message.message
            )) {
                res.status(200).json({ status: "success", data: { message }, message: "Message sent" })
            }
        } else {
            res.status(200).json({ status: "success", data: null, message: "No message sent" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}