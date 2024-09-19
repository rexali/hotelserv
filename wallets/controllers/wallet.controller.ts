import Transaction from "../../transactions/models/transaction.model";
import { TransactionType } from "../../transactions/types/types";
import Wallet from "../models/wallet.model";
import { WalletType } from "../types/types";
import { v4 as uuidv4 } from "uuid";


export class WalletService {
    data: WalletType;

    constructor(data: WalletType) {
        this.data = data;
    };

    async createWallet() {
        try {

            let wallet = await Wallet.create({ ...this.data });
            if (wallet !== null) {
                const transaction = await Transaction.create({
                    amount: wallet.balance,
                    type: "credit", // credit, debit, transfer etc
                    status: "pending",
                    description: "deposit",
                    category: "wallet",  // wallet, room, promotion, food
                    ref: uuidv4(),
                    WalletId: wallet.id,
                });
                if (transaction !== null) {
                    return wallet
                } else {
                    return null;
                }
            } else {
                return null;
            }

        } catch (error) {
            console.warn(error);
        }
    };

    // add or substract from wallet
    async updateWallet() {
        try {
            let { amount, type } = await Transaction.findOne({
                where: {
                    WalletId: this.data.id
                }
            }) as unknown as TransactionType;
            let { balance } = await Wallet.findByPk(this.data.id) as unknown as WalletType;
            if (this.data.currencyType === 'NG' && type === "credit") {
                return await Wallet.update({ balance: balance + amount }, { where: { id: this.data.id } });
            } else if (this.data.currencyType === 'NG' && type === 'debit') {
                return await Wallet.update({ balance: balance - amount }, { where: { id: this.data.id } });
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
