import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";
import BookingType from "../types/types";
import Room from "../../rooms/models/room.model";
import { RoomType } from "../../rooms/types/types";
import { RoomService } from "../../rooms/controllers/room.controller";


export async function createBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, ...rest } = req.body as BookingType;
        const bookingService = new BookingService(id as number, rest);
        const room = await RoomService.getRoom(rest.RoomId) as unknown as RoomType;
        // check to see the room is not available
        if (!room.availabilty) {
            const booking = await bookingService.createBooking() as unknown as BookingType;
            if (booking !== null) {
                // update the room availaibility
                const room = await Room.update({ availability: true }, { where: { RoomId: booking.RoomId } }) as unknown as RoomType;
                if (room.availabilty) {
                    res.status(200).json({ status: "success", data: { booking }, message: "Booking created" })
                }
            } else {
                res.status(200).json({ status: "success", data: null, message: "No booking created" })
            }
        }else{
            res.status(200).json({ status: "success", data: null, message: "The room not available for booking now" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}