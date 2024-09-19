import Transaction from "../../transactions/models/transaction.model";
import { TransactionType } from "../../transactions/types/types";
import Loyalty from "../models/loyalty.model";
import { LoyaltyType } from "../types/types";

export class LoyaltyService {

    private data: LoyaltyType;

    constructor(data: LoyaltyType) {
        this.data = data;
    };

    async createLoyalty() {
        try {
            return await Loyalty.create({ ...this.data })
        } catch (error) {
            console.warn(error);
        }
    };

    async updateLoyalty() {
        try {
            let { type } = await Transaction.findByPk(this.data.TransactionId) as unknown as TransactionType;
            let { points } = await Loyalty.findOne({ where: {TransactionId: this.data.TransactionId } }) as unknown as LoyaltyType;
            if (type === "credit") {
                return await Loyalty.update({points: points + this.data.points }, { where: { id: this.data.id} });
            } else if (type === 'debit') {
                return await Loyalty.update({ points: points - this.data.points }, { where: { id: this.data.id } });
            } else {
                return;
            }
        } catch (error) {
            console.warn(error);
        }
    };

    static async removeLoyalty(id: number) {
        try {
            return await Loyalty.destroy({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getLoyalties(page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Loyalty.findAll({
                limit: 10,
                offset
            });
        } catch (error) {
            console.warn(error);
        }
    };



    static async getUserLoyalties(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Loyalty.findAll({
                limit: 10,
                offset,
                where: {
                    UserId: userId
                }
            });
        } catch (error) {
            console.warn(error);
        }
    };


    static async getLoyalty(id: number) {
        try {
            return await Loyalty.findByPk(id)
        } catch (error) {
            console.warn(error);
        }
    };


}
