import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";
import BookingType from "../types/types";


export async function getBookingsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number };
        const booking = await BookingService.getBookings(page);
        if (booking !== null) {
            res.status(200).json({ status: "success", data: { booking }, message: "Booking created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No booking created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}