import { BookingService } from "../../bookings/controllers/booking.controller";
import { CartService } from "../../carts/controllers/cart.controller";
import { ProfileService } from "../../profiles/controllers/profile.controller";
import { RoomService } from "../../rooms/controllers/room.controller";
import { TransactionService } from "../../transactions/controllers/transaction.controller";

export class VendorServices {
    constructor() { }

    static async getVendorRooms(userId: number, page: number = 1) {
        const rooms = RoomService.getVendorRooms(userId, page);

        return rooms;
    }

    static async getVendorRoomsInCart(userId: number, page: number = 1) {
        const carts = await CartService.getVendorRoomsInCarts(userId, page);

        return carts;
    }

    static async getVendorProfile(userId: number) {
        const profile = await ProfileService.getProfile(userId);

        return profile;
    }


    static async getVendorBookings(userId: number, page: number = 1) {
        const bookings = await BookingService.getVendorBookings(userId, page);

        return bookings;
    }

    static async getVendorTransactions(userId: number, page: number = 1) {
        const transactions = await TransactionService.getVendorTransactions(userId, page);

        return transactions;
    }


    async getVendorDashboardData(req: any, res: any, next: any) {

        let vendorRoomsPromise = new Promise(async (resove, reject) => {
            try {
                const rooms = RoomService.getVendorRooms(req.body.userId, req.params.page);
                if (rooms !== null) {
                    resove(rooms);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });


        let cartRoomsPromise = new Promise(async (resove, reject) => {
            try {
                const cartRooms = await CartService.getVendorRoomsInCarts(req.body.userId, req.params.page);

                if (cartRooms !== null) {
                    resove(cartRooms);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        let vendorProfilePromise = new Promise(async (resove, reject) => {
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


        let bookedVendorRoomsPromise = new Promise(async (resove, reject) => {
            try {
                const bookedVendorRooms = await BookingService.getVendorBookings(req.body.userId, req.params.page);
                if (bookedVendorRooms !== null) {
                    resove(bookedVendorRooms);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });



        let vendorTransactionsPromise = new Promise(async (resove, reject) => {
            try {
                const vendorTransactions = await TransactionService.getVendorTransactions(req.body.userId, req.params.page);
                if (vendorTransactions !== null) {
                    resove(vendorTransactions);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        try {
            const [
                vendorRooms,
                cartRooms,
                vendorProfile,
                bookedVendorRooms,
                vendorTransactions
            ] = await Promise.all([
                vendorRoomsPromise,
                cartRoomsPromise,
                vendorProfilePromise,
                bookedVendorRoomsPromise,
                vendorTransactionsPromise]);
            return {
                vendorRooms,
                cartRooms,
                vendorProfile,
                bookedVendorRooms,
                vendorTransactions
            }
        } catch (error) {
            console.warn(error);
        }

    }

}