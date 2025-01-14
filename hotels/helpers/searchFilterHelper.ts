import { HotelRoomsBookings, Terms } from "../types/types";

export function searchFilterHelper(terms:Terms,hotels:Array<HotelRoomsBookings> ) {
    
    if (terms.name) {
        hotels.filter((hotel) => hotel.name === terms.name);
    }
    if (terms.state) {
        hotels.filter(hotel => hotel.name === terms.state);
    }
    if (terms.localGovt) {
        hotels.filter(hotel => hotel.localGovt === terms.localGovt);
    }
    if (terms.startDate) {
        hotels.filter(hotel => hotel.Rooms.filter(room => room.Bookings.filter(booking => booking.startDate === terms.startDate)));
    }
    if (terms.endDate) {
        hotels.filter(hotel => hotel.Rooms.filter(room => room.Bookings.filter(booking => booking.endDate === terms.endDate)));
    }

    return hotels;
}