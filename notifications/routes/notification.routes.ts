import express from "express";
import { getNotificationsHandler } from "../handlers/getNotificationsHandler";
import { createNotificationHandler } from "../handlers/createNotificationHandler";
import { removeNotificationHandler } from "../handlers/removeNotificationHandler";
import { updateNotificationHandler } from "../handlers/updateNoticationHandler";
import { getNotificationHandler } from "../handlers/getNotificationHandler";

const notificationRouter = express.Router();

notificationRouter.get("/", getNotificationsHandler);
notificationRouter.get("/:id", getNotificationHandler);
notificationRouter.post("/",createNotificationHandler);
notificationRouter.delete("/:id",removeNotificationHandler);
notificationRouter.put("/:id",updateNotificationHandler);

export default notificationRouter;