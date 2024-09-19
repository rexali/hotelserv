import { limit } from "../../constants/constants";
import Notification from "../models/notification.model";
import { NotificationType } from "../types/types";

export class NotificationService {

    data: NotificationType
    constructor(data: NotificationType) {
        this.data = data;
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
            const offset = (page - 1) * limit;
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
            return await Notification.create({ ...this.data });
        } catch (error) {
            console.warn(error);
        }
    }

    async updateNotification() {
        try {
            return await Notification.update({ ...this.data }, { where: { id: this.data.id } });
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