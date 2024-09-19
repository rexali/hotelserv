import { HotelService } from "../controllers/hotel.controller"
import { NextFunction, Request, Response } from "express";


export async function getHotelsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number };
        const hotels = await HotelService.getHotels(page);
        if (hotels !== null) {
            res.status(200).json({ status: "success", data: { hotels }, message: "Hotel found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hotel found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}