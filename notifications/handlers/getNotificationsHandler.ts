
import { NotificationService } from "../controllers/notificaton.controller"
import { NextFunction, Request, Response } from "express";
import { isNotificationsRead } from "../utils/isNotificationRead";
import { NotificationType } from "../types/types";

export async function getNotificationsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {page } = req.query as unknown as {page:number};
        const notifications = await NotificationService.getNotifications(page) as unknown as Array<NotificationType>;
        if (notifications !== null || undefined) {
            res.status(200).json({ status: "success", data: { notifications, sign: isNotificationsRead(notifications)}, message: "Notifications found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No notification found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}