import Transaction from "../../transactions/models/transaction.model";
import { TransactionType } from "../../transactions/types/types";
import Wallet from "../models/wallet.model";
import { WalletType } from "../types/types";


export class WalletService {
    data: WalletType;

    constructor(data: WalletType) {
        this.data = data;
    };

    async createWallet() {
        try {
            return await Wallet.create({
                ...this.data,
            });

        } catch (error) {
            console.warn(error);
        }
    };

    static async creditWallet(walletId: number, transaction: TransactionType) {
        let wallet = await Wallet.findByPk(walletId);
        let result = await Wallet.update({ balance: wallet?.balance as number + transaction.amount }, { where: { id: walletId } });
        if (result !== null) {

            return await Transaction.create({ ...transaction }) as unknown as TransactionType;
        } else {

            return null;
        }
    }

    static async debitWallet(walletId: number, transaction: TransactionType) {
        let wallet = await Wallet.findByPk(walletId) as unknown as WalletType;
        if (transaction.amount < wallet.balance) {
            let result = await Wallet.update({ balance: wallet.balance - transaction.amount }, { where: { id: walletId } });
            if (result !== null) {

                return await Transaction.create({ ...transaction }) as unknown as TransactionType;
            } else {

                return null;
            }
        } else {

            return { message: "Insufficient balance" }
        }
    }
    // credit or debit a wallet
    static async updateWallet(walletId: number, transaction: TransactionType) {
        try {

            let { balance } = await Wallet.findByPk(walletId) as unknown as WalletType;

            if (transaction.type === "credit") {

                let result = await Wallet.update({ balance: balance + transaction.amount }, { where: { id: walletId } });
                if (result !== null) {
                    let result2 =await Transaction.create({ ...transaction });
                    if (result2!==null) {
                        
                        return result;
                    } else{

                        return null
                    }
                } else {

                    return null;
                }
            } else if (transaction.type === 'debit') {
                if (transaction.amount < balance) {
                    let result = await Wallet.update({ balance: balance - transaction.amount }, { where: { id: walletId } });
                    if (result !== null) {
                        let result2 =await Transaction.create({ ...transaction });
                        if (result2!==null) {

                            return result
                        } else{

                            return null
                        }
                    } else {

                        return null;
                    }
                } else {

                    return { message: "Insufficient balance" }
                }
            } else {

                return null;
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
