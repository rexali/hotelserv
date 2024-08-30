import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";
import BookingType from "../types/types";
import Room from "../../rooms/models/room.model";
import { RoomType } from "../../rooms/types/types";
import { RoomService } from "../../rooms/controllers/room.controller";


export async function createBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as BookingType;
        const bookingService = new BookingService(data.id, data);
        const room = await RoomService.getRoom(data.RoomId) as unknown as RoomType;
        // check to see the room is not available
        if (!room.availability) {
            const booking = await bookingService.createBooking() as unknown as BookingType;
            if (booking !== null) {
                // update the room availaibility
                const room = await Room.update({ availability: true }, { where: { id: booking.RoomId } }) as unknown as RoomType;
                if (room.availability) {
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