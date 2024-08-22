import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";
import BookingType from "../types/types";


export async function updateBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, ...rest } = req.body as BookingType;
        const bookingService = new BookingService(id as number, rest);
        const booking = await bookingService.updateBooking();
        if (booking !== null) {
            res.status(200).json({ status: "success", data: { booking }, message: "Hotel updated" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "Not updated" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}