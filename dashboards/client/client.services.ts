import { BookingService } from "../../bookings/controllers/booking.controller";
import { CartService } from "../../carts/controllers/cart.controller";
import { FavoriteService } from "../../favourites/controllers/favourite.controller";
import { ProfileService } from "../../profiles/controllers/profile.controller";
import { TransactionService } from "../../transactions/controllers/transaction.controller";

export class ClientServices {
    constructor() { }

    static async getClientFavouriteRooms(userId: number, page: number = 1) {
        const favourites = await FavoriteService.getFavorites(userId, page);

        return favourites;
    }

    static async getClientRoomsInCart(userId: number, page: number = 1) {
        const carts = await CartService.getCarts(userId, page);

        return carts;
    }

    static async getClientProfile(userId: number) {
        const profile = await ProfileService.getProfile(userId);

        return profile;
    }


    static async getClientBookings(userId: number, page: number = 1) {
        const bookings = await BookingService.getUserBookings(userId, page);

        return bookings;
    }

    static async getClientTransactions(userId: number, page: number = 1) {
        const transactions = await TransactionService.getUserTransactions(userId,page);

        return transactions;
    }


    async getClientDashboardData(req: any, res: any, next: any) {
        
        let favouritePromise = new Promise(async (resove, reject) => {
            try {
                const favourites = await FavoriteService.getFavorites(req.body.userId, req.params.page)
                if (favourites !== null) {
                    resove(favourites);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });


        let cartPromise = new Promise(async (resove, reject) => {
            try {
                const carts = await CartService.getCarts(req.body.userId, req.params.page)
                if (carts !== null) {
                    resove(carts);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        let profilePromise = new Promise(async (resove, reject) => {
            try {
                const profile = await ProfileService.getProfile(req.body.userId)
                if (profile !== null) {
                    resove(profile);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });


        let bookingPromise = new Promise(async (resove, reject) => {
            try {
                const booking = await BookingService.getUserBookings(req.body.userId, req.params.page);
                if (booking !== null) {
                    resove(booking);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });



        let transactionPromise = new Promise(async (resove, reject) => {
            try {
                const transactions = await TransactionService.getUserTransactions(req.body.userId, req.params.page)
                if (transactions !== null) {
                    resove(transactions);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        try {
            const [
                favourites,
                carts,
                profile,
                bookings,
                transactions
            ] = await Promise.all([
                favouritePromise,
                cartPromise,
                profilePromise,
                bookingPromise,
                transactionPromise]);
            return {
                favourites,
                carts,
                profile,
                bookings,
                transactions
            }
        } catch (error) {
            console.warn(error);
        }

    }

}