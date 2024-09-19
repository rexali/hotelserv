import { limit } from "../../constants/constants";
import Hotel from "../../hotels/models/hotel.model";
import Room from "../../rooms/models/room.model";
import Promotion from "../models/promotion.model";
import { PromotionType } from "../types/types";
import Transaction from "../../transactions/models/transaction.model";
import { v4 as uuidv4 } from "uuid";

export class PromotionService {
    data: PromotionType

    constructor(data: PromotionType) {
        this.data = data;
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

            let promotion = await Promotion.create({ ...this.data });
            
            if (promotion !== null) {

                const transaction = await Transaction.create({
                    amount: 49000,
                    type: "credit",
                    status: "pending",
                    description: "deposit",
                    category: "promotion",
                    ref: uuidv4(),
                    promotionId: promotion.id,
                });

                if (transaction !== null) {

                    return promotion
                } else {

                    return null;
                }
            } else {

                return null;
            }
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