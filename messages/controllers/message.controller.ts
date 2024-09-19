import Message from "../models/message.model";
import { MessageType } from "../types/types";

export class MessageService {
   
    data: MessageType
    constructor(data: MessageType) {
        this.data = data
    }

    static async getMessage(id: number) {
        try {
            return await Message.findOne({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    static async getMessages(page: number = 1) {
        const limit = 10;
        const offset = (page - 1) * limit;
        try {
            return await Message.findAll({
                limit,
                offset
            });
        } catch (error) {
            console.warn(error);
        }

    }

    async createMessage() {
        try {
            return await Message.create({ ...this.data });
        } catch (error) {
            console.warn(error);
        }
    }

    async updateMessage() {
        try {
            return await Message.update({ ...this.data }, { where: { id:this.data.id} });
        } catch (error) {
            console.warn(error);
        }
    }

    static async removeMessage(id: number) {
        try {
            return await Message.destroy({ where: { id: id } });
        } catch (error) {
            console.warn(error);
        }
    }
}