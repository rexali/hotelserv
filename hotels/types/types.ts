import BookingType from "../../bookings/types/types"
import { RoomType } from "../../rooms/types/types"

export type HotelType = {
    id: number,
    name: string,
    photo: string,
    email: string,
    phone: string,
    address: string,
    description: string,
    localGovt: string,
    state: string,
    country: string,
    document: string,
    UserId: number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface Terms {
    startDate?: Date, // checkIn
    endDate?: Date, // checkOut
    name?: string,
    state?: string,
    localGovt?: string,
    page?: number
}

type RoomsBookingsType = RoomType & {
    Bookings: Array<BookingType>
}

export type HotelRoomsBookings = HotelType & {
    Rooms: Array<RoomsBookingsType>;
}