import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";
import BookingType from "../types/types";


export async function createBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, ...rest } = req.body as BookingType;
        const bookingService = new BookingService(id as number, rest);
        const booking = await bookingService.createBooking();
        if (booking !== null) {
            res.status(200).json({ status: "success", data: { booking }, message: "Booking created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No booking created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}