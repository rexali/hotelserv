import { limit } from "../../constants/constants";
import Booking from "../models/booking.model";
import BookingType from "../types/types";


export class BookingService {

    private id: number;
    private data: BookingType;

    constructor(id: number, data: BookingType) {
        this.id = id;
        this.data = data;
    };

    async createBooking() {
        try {
            return await Booking.create({ ...this.data, status: "pending" })
        } catch (error) {
            console.warn(error);
        }
    };

    async updateBooking() {
        try {
            return await Booking.update({ ...this.data }, { where: { id: this.id } })
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
            const offset = (page - 1) * limit
            return await Booking.findAll({
                offset,
                limit
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
