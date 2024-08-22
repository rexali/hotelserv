import { HotelService } from "../controllers/hotel.controller"
import { NextFunction, Request, Response } from "express";


export async function removeHotelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as {id:number};
        const hotel = await HotelService.removeHotel(id);
        if (hotel !== null) {
            res.status(200).json({ status: "success", data: { hotel }, message: "Hotel deleted" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hotel deleted" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}