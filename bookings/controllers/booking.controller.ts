import User from "../../auth/models/user.model";
import { limit } from "../../constants/constants";
import Hotel from "../../hotels/models/hotel.model";
import Room from "../../rooms/models/room.model";
import Booking from "../models/booking.model";
import BookingType from "../types/types";


export class BookingService {

    private data: BookingType;

    constructor(data: BookingType) {
        this.data = data;
    };

    async createBooking() {
        try {
            return await Booking.create({
                ...this.data,
                status: "completed",

            })
        } catch (error) {
            console.warn(error);
        }
    };

    async updateBooking() {
        try {
            return await Booking.update({ ...this.data }, { where: { id: this.data.id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async removeBooking(id: number) {
        try {
            return await Booking.destroy({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getBookings(page: number = 1) {
        try {
            const offset = (page - 1) * limit;
            return await Booking.findAll({
                offset,
                limit,
                include: [
                    {
                        model: User,
                        attributes: ["id", "username"],
                        required: false
                    },
                    {
                        model: Room,
                        required: false,
                        include: [
                            {
                                model: Hotel,
                                required: false,
                                include: [
                                    {
                                        model: User,
                                        attributes: ["id", "username"],
                                        required: false
                                    }
                                ]
                            },
                        ]

                    }
                ]
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getUserBookings(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * limit
            return await Booking.findAll({
                offset,
                limit,
                where: {
                    UserId: userId
                },
                include: [{
                    model: User,
                    attributes: ["id", "username"],
                    required: false
                },
                {
                    model: Room,
                    required: false,
                    include: [
                        {
                            model: Hotel,
                            required: false,
                            include: [
                                {
                                    model: User,
                                    attributes: ["id", "username"],
                                }
                            ]
                        },
                    ]

                }
                ]
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getVendorBookings(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * limit
            return await Booking.findAll({
                offset,
                limit,
                include: [{
                    model: User,
                    attributes: ["id", "username"],
                    required: false
                },
                {
                    model: Room,
                    required: false,
                    include: [
                        {
                            model: Hotel,
                            required: false,
                            where: {
                                UserId: userId
                            },
                            include: [
                                {
                                    model: User,
                                    attributes: ["id", "username"],
                                    where: {
                                        id: userId
                                    },

                                }
                            ]
                        },
                    ]

                }
                ]
            });
        } catch (error) {
            console.warn(error);
        }
    };


    static async getBooking(id: number) {
        try {
            return await Booking.findOne({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async cancelBooking(id: number) {
        try {
            return await Booking.update({ status: "canceled" }, { where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };
}
