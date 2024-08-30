import User from "../../auth/models/user.model";
import Transaction from "../models/transaction.model";
import { TransactionType } from "../types/types";

export class TransactionService {

    id: number;
    data: TransactionType;

    constructor(id: number, data: TransactionType) {
        this.id = id;
        this.data = data;
    };

    async createTransaction() {
        try {
            return await Transaction.create({ ...this.data })
        } catch (error) {
            console.warn(error);
        }
    };

    async updateTransaction() {
        try {
            return await Transaction.update({ ...this.data }, { where: { id: this.id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async removeTransaction(id: number) {
        try {
            return await Transaction.destroy({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getTransactions(page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Transaction.findAll({
                limit: 10,
                offset
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getUserTransactions(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Transaction.findAll({
                limit: 10,
                offset,
                include:{
                  model:User,
                  where:{
                    UserId:userId
                  } 
                }
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getTransaction(id: number) {
        try {
            return await Transaction.findOne({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };


}
