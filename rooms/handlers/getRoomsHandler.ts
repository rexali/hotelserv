import { RoomService} from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";


export async function getRoomsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const rooms = await RoomService.getRooms();
        if (rooms !== null) {
            res.status(200).json({ status: "success", data: { rooms }, message: "Hotel created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hotel created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}