import User from "../../auth/models/user.model";
import { limit } from "../../constants/constants";
import Hotel from "../../hotels/models/hotel.model";
import Room from "../../rooms/models/room.model";
import Cart from "../models/cart.model";
import { CartType } from "../types/types";

export class CartService {
    cart: CartType
    constructor(cart: CartType) {
        this.cart = cart
    }

    static async getCarts(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * limit;
            return await Cart.findAll({
                limit,
                offset,
                where: {
                    UserId: userId
                },
                include: {
                    model: Room,
                    required: false
                }
            });
        } catch (error) {
            console.warn(error);
        }
    }

    static async getAllCarts(page: number = 1) {
        try {
            const offset = (page - 1) * limit;
            return await Cart.findAll({
                limit,
                offset,
                include: {
                    model: Room,
                    required: false
                }
            });
        } catch (error) {
            console.warn(error);
        }
    }

    static async getVendorRoomsInCarts(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * limit;
            return await Cart.findAll({
                limit,
                offset,
                include: {
                    model: Room,
                    required: false,
                    include: [{
                        model: Hotel,
                        required: false,
                        where: {
                            UserId: userId
                        },
                        include: [{
                            model: User,
                            required: false,
                            where: {
                                id: userId
                            },
                        }]
                    }]
                }
            });
        } catch (error) {
            console.warn(error);
        }
    }

    async createCart() {
        try {
            return await Cart.create({ ...this.cart });
        } catch (error) {
            console.warn(error);
        }
    }

    static async removeCart(id: number, UserId: number) {
        try {
            return await Cart.destroy({ where: { id, UserId } });
        } catch (error) {
            console.warn(error);
        }
    }

    static async clearCart(UserId: number) {
        try {
            return await Cart.destroy({ where: { UserId } });
        } catch (error) {
            console.warn(error);
        }
    }
}