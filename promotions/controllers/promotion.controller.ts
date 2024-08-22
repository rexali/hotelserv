import { number } from "joi";
import { limit } from "../../constants/constants";
import Hotel from "../../hotels/models/hotel.model";
import Room from "../../rooms/models/room.model";
import Promotion from "../models/promotion.model";
import { PromotionType } from "../types/types";

export class PromotionService {
    id: number;
    promotion: PromotionType

    constructor(id: number, promotion: PromotionType) {
        this.id = id;
        this.promotion = promotion;
    }

    static async getPromotions(page: number = 1) {
        try {
            const offset = (page - 1) * limit;
            return await Promotion.findAll({
                limit,
                offset,
                include: {
                    model: Room,
                    required: false,
                    include: [
                        {
                            model: Hotel,
                            required: false,
                        }
                    ]
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    static async getPromotion(id: number) {
        try {
            return await Promotion.findAll({
                where: {
                    id: id
                },
                include: {
                    model: Room,
                    required: false,
                    include: [
                        {
                            model: Hotel,
                            required: false,
                        }
                    ]
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    static async getUserPromotions(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * limit;
            return await Promotion.findAll({
                limit,
                offset,
                where: {
                    UserId: userId
                },
                include: {
                    model: Room,
                    required: false,
                    include: [
                        {
                            model: Hotel,
                            required: false,
                        }
                    ]
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    async createPromotion() {
        try {
            return await Promotion.create({ ...this.promotion });
        } catch (error) {
            console.warn(error);
        }
    }

    static async removePromotion(id: number, UserId: number) {
        try {
            return await Promotion.destroy({ where: { id, UserId } });
        } catch (error) {
            console.warn(error);
        }
    }

}