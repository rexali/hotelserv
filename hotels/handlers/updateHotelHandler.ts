import { HotelService } from "../controllers/hotel.controller"
import { NextFunction, Request, Response } from "express";
import { HotelType } from "../types/types";


export async function updateHotelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, ...rest } = req.body as HotelType;
        const hotelService = new HotelService(id as number, rest);
        const hotel = await hotelService.updateHotel();
        if (hotel !== null) {
            res.status(200).json({ status: "success", data: { hotel }, message: "Hotel updated" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "Not updated" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}