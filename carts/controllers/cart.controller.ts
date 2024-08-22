import { limit } from "../../constants/constants";
import Room from "../../rooms/models/room.model";
import Cart from "../models/cart.model";
import { CartType } from "../types/types";

export class CartService {
    id: number;
    cart: CartType
    constructor(id: number, cart: CartType) {
        this.id = id;
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
                    where: {
                        UserId: userId
                    },
                    required: false
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