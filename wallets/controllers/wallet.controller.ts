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
            return await Wallet.update({ ...this.data }, { where: { id: this.id } })
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
            return await Wallet.findOne({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };


}
