
import { NotificationService } from "../controllers/notificaton.controller"
import { NextFunction, Request, Response } from "express";


export async function removeNotificationHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as any;
        const notification = await NotificationService.removeNotification(id);
        if (notification !== null) {
            res.status(200).json({ status: "success", data: { notification }, message: "Notification removed " })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No notification deleted" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}