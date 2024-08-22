import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";


export async function getBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params as unknown as { id: number };
        const booking = await BookingService.getBooking(id);
        if (booking !== null) {
            res.status(200).json({ status: "success", data: { booking }, message: "Booking created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No booking created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}