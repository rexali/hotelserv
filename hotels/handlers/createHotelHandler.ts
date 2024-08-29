import { HotelService } from "../controllers/hotel.controller"
import { NextFunction, Request, Response } from "express";
import { HotelType } from "../types/types";


export function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as HotelType;
        const hotelService = new HotelService(data.id, data);
        const hotel = hotelService.createHotel();
        if (hotel !== null) {
            res.status(200).json({ status: "success", data: { hotel }, message: "Hotel created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hotel created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}