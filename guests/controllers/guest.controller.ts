import User from "../../auth/models/user.model";
import { limit } from "../../constants/constants";
import Guest from "../models/guest.model";
import { GuestType } from "../types/types";

export class GuestService {

    private id: number;
    private data: GuestType;

    constructor(id: number, data: GuestType) {
        this.id = id;
        this.data = data
    }

    static async getGuest(id: number) {
        try {
            return await Guest.findOne({
                where: {
                    id: id
                },
                include: {
                    model: User,
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    static async getGuests(page: number) {
        try {
            const offset = (page - 1) * limit;
            return await Guest.findAll({
                limit,
                offset,
                include: {
                    model: User,
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    async createGuest() {
        try {
            return await Guest.create({ ...this.data });
        } catch (error) {
            console.warn(error);
        }
    }

    async updateGuest() {
        try {
            return await Guest.update({ ...this.data }, { where: { id: this.id } });
        } catch (error) {
            console.warn(error);
        }
    }
}