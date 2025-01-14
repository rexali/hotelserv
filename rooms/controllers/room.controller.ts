import { Op } from "sequelize";
import Room from "../models/room.model";
import { RoomType } from "../types/types";
import Hotel from "../../hotels/models/hotel.model";
import { limit } from "../../constants/constants";

export class RoomService {

    data: RoomType;

    constructor(data: RoomType) {
        this.data = data;
    };

    async createRoom() {
        try {
            return await Room.create({ ...this.data })
        } catch (error) {
            console.warn(error);
        }
    };

    async editRoom() {
        try {
            return await Room.update({ ...this.data }, { where: { id: this.data.id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async removeRoom(id: number) {
        try {
            return await Room.destroy({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getRooms(page: number = 1) {
        try {
            const offset = (page - 1) * limit
            return await Room.findAll({
                limit,
                offset,
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getVendorRooms(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * limit
            return await Room.findAll({
                limit,
                offset,
                include: {
                    model: Hotel,
                    required:false,
                    where: {
                        UserId: userId
                    }
                }

            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getAvailableRooms(page: number = 1) {
        try {
            const offset = (page - 1) * limit
            return await Room.findOne({
                limit,
                offset,
                where: {
                    availability: true
                }
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getRoom(id: number) {
        try {
            return await Room.findOne({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async searchRooms(term: string, page: number) {
        try {
            const offset = (page - 1) * limit
            return await Room.findAll({
                limit,
                offset,
                where: {
                    roomType: {
                        [Op.like]: `%${term}%`,
                    },
                },
                include: {
                    model: Hotel,
                }
            });
        } catch (error) {
            console.warn(error);
        }
    };
}
