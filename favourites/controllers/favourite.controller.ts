import { limit } from "../../constants/constants";
import Hotel from "../../hotels/models/hotel.model";
import Room from "../../rooms/models/room.model";
import Favorite from "../models/favorite.model";
import { FavoriteType } from "../types/types";

export class FavoriteService {
    favorite: FavoriteType

    constructor(favorite: FavoriteType) {
        this.favorite = favorite;
    }

    static async getFavorites(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * limit;
            return await Favorite.findAll({
                limit,
                offset,
                where: {
                    UserId: userId
                },
                include: [{
                    model: Room,
                    required: false,
                    include: [
                        {
                            model: Hotel,
                            required: false
                        }
                    ]
                }]
            });
        } catch (error) {
            console.warn(error);
        }
    }

    async createFavorite() {
        try {
            return await Favorite.create({ ...this.favorite });
        } catch (error) {
            console.warn(error);
        }
    }

    static async removeFavorite(id: number, UserId: number) {
        try {
            return await Favorite.destroy({ where: { id, UserId } });
        } catch (error) {
            console.warn(error);
        }
    }

    static async clearFavorite(UserId: number) {
        try {
            return await Favorite.destroy({ where: { UserId } });
        } catch (error) {
            console.warn(error);
        }
    }
}