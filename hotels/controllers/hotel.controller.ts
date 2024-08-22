import { Op } from "sequelize";
import Room from "../../rooms/models/room.model";
import Hotel from "../models/hotel.model";
import { HotelRoomsBookings, HotelType, Terms } from "../types/types";
import Booking from "../../bookings/models/booking.model";

export class HotelService {

    id: number;
    data: HotelType;

    constructor(id: number, data: HotelType) {
        this.id = id;
        this.data = data;
    };

    async createHotel() {
        try {
            return await Hotel.create({ ...this.data })
        } catch (error) {
            console.warn(error);
        }
    };

    async updateHotel() {
        try {
            return await Hotel.update({ ...this.data }, { where: { id: this.id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async removeHotel(id: number) {
        try {
            return await Hotel.destroy({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getHotels(page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Hotel.findAll({
                limit: 10,
                offset
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getHotel(id: number) {
        try {
            return await Hotel.findOne({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getHotelRooms(id: number, page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Hotel.findAll({
                limit: 10,
                offset,
                where: { id: id },
                include: {
                    model: Room,
                }
            })
        } catch (error) {
            console.warn(error);
        }
    };

    static async searchHotels(terms: Terms, page:number=1) {
        const offset = (page - 1) * 10;
        try {
            return await Hotel.findAll({
                limit:10,
                offset,
                where: {
                    name: {
                        [Op.like]: `${terms.name}%`,
                    },
                    state: {
                        [Op.like]: `${terms.state}%`,
                    }
                },
                include: Room
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async searchHotelWithTerms(terms: Terms, page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            let hotels: Array<HotelRoomsBookings> = [];
            hotels = await Hotel.findAll({
                limit:10,
                offset,
                include: {
                    model: Room,
                    include: [
                        {
                            model: Booking,
                            required: false
                        }
                    ],
                    required: false
                }
            }) as unknown as Array<HotelRoomsBookings>;

            if (terms.name) {
                hotels.filter((hotel) => hotel.name === terms.name);
            }
            if (terms.state) {
                hotels.filter(hotel => hotel.name === terms.state);
            }
            if (terms.localgovt) {
                hotels.filter(hotel => hotel.localgovt === terms.localgovt);
            }
            if (terms.startDate) {
                hotels.filter(hotel => hotel.Rooms.filter(room => room.Bookings.filter(booking => booking.startDate === terms.startDate)));
            }
            if (terms.endDate) {
                hotels.filter(hotel => hotel.Rooms.filter(room => room.Bookings.filter(booking => booking.endDate === terms.endDate)));
            }
            return hotels;
        } catch (error) {
            console.warn(error);
        }
    };
}
