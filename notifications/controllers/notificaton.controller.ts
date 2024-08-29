import { limit } from "../../constants/constants";
import Notification from "../models/notification.model";
import { NotificationType } from "../types/types";

export class NotificationService {
    id: number;
    notification: NotificationType
    constructor(id: number, notification: NotificationType) {
        this.id = id;
        this.notification = notification
    }

    static async getNotification(id: number) {
        try {
            return await Notification.findOne({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    static async getNotifications(page: number = 1) {
        try {
            const offset = (page-1)*limit;
            return await Notification.findAll({
                limit,
                offset
            });
        } catch (error) {
            console.warn(error);
        }

    }

    async createNotification() {
        try {
            return await Notification.create({ ...this.notification });
        } catch (error) {
            console.warn(error);
        }
    }

    async updateNotification() {
        try {
            return await Notification.update({ ...this.notification }, { where: { id: this.id } });
        } catch (error) {
            console.warn(error);
        }
    }

    static async removeNotification(id: number) {
        try {
            return await Notification.destroy({ where: { id: id } });
        } catch (error) {
            console.warn(error);
        }
    }
}