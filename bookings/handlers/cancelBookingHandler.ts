import { BookingService} from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";


export async function cancelBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as any;
        const booking = await BookingService.cancelBooking(id);
        if (booking !== null) {
            res.status(200).json({ status: "success", data: { booking }, message: "Booking canceled" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No booking canceled" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}