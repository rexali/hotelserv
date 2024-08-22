import { HotelService } from "../controllers/hotel.controller"
import { NextFunction, Request, Response } from "express";


export async function getHotelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as { id: number };
        const hotel = await HotelService.getHotel(id);
        if (hotel !== null) {
            res.status(200).json({ status: "success", data: { hotel }, message: "Hotel found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hotel found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}