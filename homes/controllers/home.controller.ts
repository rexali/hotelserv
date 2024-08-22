import { Op } from "sequelize"
import Booking from "../../bookings/models/booking.model"
import Hotel from "../../hotels/models/hotel.model"
import Room from "../../rooms/models/room.model"
import { HotelRoomsBookings, Terms } from "../../hotels/types/types"
import { searchFilterHelper } from "../../hotels/helpers/searchFilterHelper"
import Promotion from "../../promotions/models/promotion.model"

export class HomeService {
    constructor() { }

    // use paid room or room with high number of clicks got from session.
    static popularHotelRooms = async () => {
        return await Hotel.findAll({
            include: {
                model: Room,
                required: false,
                include: [
                    {
                        model: Booking, // replaced with Transaction model is ready
                        required: true
                    }
                ],
            },
            group: ["Bookings.price"], // also this
            order: [['Bookings.price', 'DESC']] // also this 
        })
    }

    // use cookie searched term preferences
    static recommendedHotelRooms = async (terms: Terms, page: number = 1) => {
        try {
            const offset = (page - 1) * 10;
            let hotels: Array<HotelRoomsBookings> = [];
            hotels = await Hotel.findAll({
                limit: 10,
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
            return searchFilterHelper(terms, hotels);
        } catch (error) {
            console.log(error);
        }
    }

    // featured
    static sponsoredHotelRoom = async () => {
        try {
            return await Promotion.findAll({
                include: {
                    model: Room,
                    required: false
                }
            })
        } catch (error) {
            console.log(error);
        }

    }
}