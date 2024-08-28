import Transaction from "../../transactions/models/transaction.model";
import { TransactionType } from "../../transactions/types/types";
import Wallet from "../models/wallet.model";
import { WalletType } from "../types/types";

export class WalletService {

    id: number;
    data: WalletType;

    constructor(id: number, data: WalletType) {
        this.id = id;
        this.data = data;
    };

    async createWallet() {
        try {
            return await Wallet.create({ ...this.data })
        } catch (error) {
            console.warn(error);
        }
    };

    async updateWallet() {
        try {
            let { amount, type } = await Transaction.findOne({
                where: {
                    UserId: this.data.UserId,
                    WalletId: this.data.id
                }
            }) as unknown as TransactionType;
            let { balance } = await Wallet.findByPk(this.id) as unknown as WalletType;
            if (this.data.type === 'credit' && type === "credit") {
                return await Wallet.update({ balance: balance + amount }, { where: { id: this.id } });
            } else if (this.data.type === 'debit' && type === 'debit') {
                return await Wallet.update({ balance: balance - amount }, { where: { id: this.id } });
            } else {
                return;
            }
        } catch (error) {
            console.warn(error);
        }
    };

    static async removeWallet(id: number) {
        try {
            return await Wallet.destroy({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getWallets(page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Wallet.findAll({
                limit: 10,
                offset
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getUserWallets(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Wallet.findAll({
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

    static async getWallet(id: number) {
        try {
            return await Wallet.findByPk(id)
        } catch (error) {
            console.warn(error);
        }
    };


}
