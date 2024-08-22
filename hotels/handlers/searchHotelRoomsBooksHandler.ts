import { HotelService } from "../controllers/hotel.controller"
import { NextFunction, Request, Response } from "express";
import { Terms } from "../types/types";


export async function searchHotelRoomsBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const terms = req.query as unknown as Terms;
        const hotelRoomsBooking = await HotelService.searchHotelWithTerms(terms,terms.page);
        if (hotelRoomsBooking !== null) {
            // Remember Me" for 15 minutes: res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
            res.cookie("rememberme", terms, { secure: false, path: "/", expires: new Date(Date.now() + 900000), httpOnly: false });
            res.status(200).json({ status: "success", data: { hotelRoomsBooking }, message: "Hotel and rooms found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hotel and rooms found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}