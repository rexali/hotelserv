import { Op } from "sequelize";
import { AuthService } from "../../auth/controllers/auth.controller";
import User from "../../auth/models/user.model";
import { BookingService } from "../../bookings/controllers/booking.controller";
import { CartService } from "../../carts/controllers/cart.controller";
import { GuestService } from "../../guests/controllers/guest.controller";
import { MessageService } from "../../messages/controllers/message.controller";
import { NotificationService } from "../../notifications/controllers/notificaton.controller";
import { ProfileService } from "../../profiles/controllers/profile.controller";
import { RoomService } from "../../rooms/controllers/room.controller";
import { TransactionService } from "../../transactions/controllers/transaction.controller";
import Transaction from "../../transactions/models/transaction.model";
import Booking from "../../bookings/models/booking.model";
import sequelize from "sequelize/types/sequelize";

export class AdminServices {
    constructor() { }

    static async getAllRooms(page: number = 1) {
        const rooms = await RoomService.getRooms(page);

        return rooms;
    }

    static async getAvailableRooms(page: number = 1) {
        const availableRooms = await RoomService.getAvailableRooms(page);

        return availableRooms;
    }

    static async getRoomsInCart(page: number = 1) {
        const carts = await CartService.getAllCarts(page);

        return carts;
    }

    static async getProfiles(page: number) {
        const profiles = await ProfileService.getProfiles(page);

        return profiles;
    }

    static async getBookings(page: number = 1) {
        const bookings = await BookingService.getBookings(page);

        return bookings;
    }

    static async getTransactions(page: number = 1) {
        const transactions = await TransactionService.getTransactions(page);

        return transactions;
    }

    static async getGuests(page: number = 1) {
        const guests = await GuestService.getGuests(page);

        return guests;
    }


    static async getMessages(page: number = 1) {
        const messages = await MessageService.getMessages(page);

        return messages;
    }

    static async getNotifications(page: number = 1) {
        const notifications = await NotificationService.getNotifications(page);

        return notifications;
    }


    static async getAllRegisteredUsers(page: number = 1) {
        const users = await AuthService.getAllUsers(page);

        return users;
    }


    async getNumbersOfNewRegisteredUsersThisWeek() {

        try {
            const today = new Date();
            const lastWeek = today.setDate(today.getDate() - 7);
            const users = await User.count({
                where: {
                    createdAt: {
                        [Op.gte]: new Date(lastWeek)
                    }
                }
            })

            return users;

        } catch (error) {

            console.log(error)
        }
    }


    async getNewRegisteredUsersPerDayOftheMonth() {
        try {
            const usersByDay = await User.findAll({
                attributes: [
                    [sequelize.fn('DATE_TRUNC', 'day', sequelize.col('createdAt')), 'day'],
                    [sequelize.fn('COUNT', sequelize.col('id')), 'numberOfUsers']
                ],
                where: {
                    createdAt: {
                        [Op.gte]: sequelize.literal('DATE_TRUNC(\'month\', CURRENT_DATE)'),
                        [Op.lte]: sequelize.literal('DATE_TRUNC(\'month\', CURRENT_DATE) + INTERVAL \'1 month\'')
                    }
                },
                group: ['day']
            });

            const usersByDayOfMonth = {} as any;

            usersByDay.forEach((user: any) => {
                const dayOfMonth = new Date(user.day).getDate() as any;
                usersByDayOfMonth[dayOfMonth] = user.numberOfUsers
            });
             let result = usersByDayOfMonth;
            return {
                usersByDayOfMonth: Object.values(result), 
                result 
            }

        } catch (error) {

            console.log(error);

        }
    }


    async getTotalTransactions() {
        try {
            const totalTransactions = await Transaction.sum('amount');

            return totalTransactions
        } catch (error) {
            console.log(error);
        }
    }

    async getTotalTransactionsThisWeek() {
        try {
            const today = new Date();
            const lastWeek = today.setDate(today.getDate() - 7);
            const totalTransactions = await Transaction.sum('amount', {
                where: {
                    createdAt: {
                        [Op.gte]: new Date(lastWeek)
                    }
                }
            });

            return totalTransactions
        } catch (error) {
            console.log(error);
        }
    }



    async getTotalBookingsAmountPerDayOfTheWeek() {
        const today = new Date();
        const lastWeek = today.setDate(today.getDate() - 7);

        const totalBookingsAmountByDayofTheWeek: any = {
            Monday: 0,
            Tueday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
            Sunday: 0
        }

        try {
            const bookingsByDay = await Booking.findAll({
                attributes: [
                    "Bookings.id",
                    [sequelize.fn("DATE_TRUNC", 'day', sequelize.col('Transactions.createdAt')), 'day'],
                    [sequelize.fn("SUM", sequelize.col('Transactions.amount')), 'totalBookingsAmountThisWeek'],
                ],
                include: [
                    {
                        model: Transaction,
                    }
                ],
                where: {
                    createdAt: {
                        [Op.gte]: new Date(lastWeek)
                    }
                },
                group: ['Bookings.id', 'day']
            });

            bookingsByDay.forEach((booking: any) => {
                const dayOfWeek = new Date(booking.day).toLocaleString('en-US', { weekday: 'long' }) as any;
                totalBookingsAmountByDayofTheWeek[dayOfWeek] = booking.totalBookingsAmountThisWeek;
            });

            let result = totalBookingsAmountByDayofTheWeek;
           
            return {
                totalBookingsAmountByDayOfTheWeek: Object.values(result),
                result
            }

        } catch (error) {
            console.log(error);
        }
    }

    
    async getClientDashboardData(req: any, res: any, next: any) {

        let roomsPromise = new Promise(async (resove, reject) => {
            try {
                const rooms = await RoomService.getRooms(req.params.page);
                if (rooms !== null) {
                    resove(rooms);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        let availableRoomsPromise = new Promise(async (resove, reject) => {
            try {
                const availableRooms = await RoomService.getAvailableRooms(req.params.page);
                if (availableRooms !== null) {
                    resove(availableRooms);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        let roomsInCartPromise = new Promise(async (resove, reject) => {
            try {
                const roomsInCarts = await CartService.getAllCarts(req.params.page);

                if (roomsInCarts !== null) {
                    resove(roomsInCarts);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        let profilePromise = new Promise(async (resove, reject) => {
            try {
                const profile = await ProfileService.getProfiles(req.params.page)
                if (profile !== null) {
                    resove(profile);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        let bookingsPromise = new Promise(async (resove, reject) => {
            try {
                const bookings = await BookingService.getBookings(req.params.page);
                if (bookings !== null) {
                    resove(bookings);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        let transactionsPromise = new Promise(async (resove, reject) => {
            try {
                const transactions = await TransactionService.getTransactions(req.params.page);
                if (transactions !== null) {
                    resove(transactions);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        let guestsPromise = new Promise(async (resove, reject) => {
            try {
                const guests = await GuestService.getGuests(req.params.page);
                if (guests !== null) {
                    resove(guests);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });


        let messagesPromise = new Promise(async (resove, reject) => {
            try {
                const messages = await MessageService.getMessages(req.params.page);
                if (messages !== null) {
                    resove(messages);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });


        let notificationsPromise = new Promise(async (resove, reject) => {
            try {
                const notifications = await NotificationService.getNotifications(req.params.page);
                if (notifications !== null) {
                    resove(notifications);
                } else {
                    reject(null)
                }
            } catch (error) {
                console.warn(error)
            }

        });

        try {
            const [
                rooms,
                availableRooms,
                roomsInCart,
                profiles,
                bookings,
                transactions,
                guests,
                messages,
                notifications
            ] = await Promise.all([
                roomsPromise,
                availableRoomsPromise,
                roomsInCartPromise,
                profilePromise,
                bookingsPromise,
                transactionsPromise,
                guestsPromise,
                messagesPromise,
                notificationsPromise
            ]);
            return {
                rooms,
                availableRooms,
                roomsInCart,
                profiles,
                bookings,
                transactions,
                guests,
                messages,
                notifications
            }
        } catch (error) {
            console.warn(error);
        }

    }


}