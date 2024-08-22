
import { NotificationService } from "../controllers/notificaton.controller"
import { NextFunction, Request, Response } from "express";
import { NotificationType } from "../types/types";

export async function getNotificationHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {id } = req.params as unknown as {id:number};
        const notification = await NotificationService.getNotification(id) as unknown as NotificationType;
        if (notification !== null || undefined) {
            res.status(200).json({ status: "success", data: { notification}, message: "Notifications found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No notification found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}