
import { NotificationService } from "../controllers/notificaton.controller"
import { NextFunction, Request, Response } from "express";
import { NotificationType } from "../types/types";


export async function createNotificationHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as NotificationType;
        const notificationService = new NotificationService(data);
        const notification = await notificationService.createNotification();
        if (notification !== null) {
            res.status(200).json({ status: "success", data: { notification }, message: "Notification created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No notification created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}