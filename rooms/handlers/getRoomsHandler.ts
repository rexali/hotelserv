import { RoomService} from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";


export async function getRoomsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const rooms = await RoomService.getRooms();
        if (rooms !== null) {
            if (rooms?.length) {
                res.status(200).json({ status: "success", data: { rooms }, message: "Room(s) found" }) 
            } else{
                res.status(200).json({ status: "success", data: [], message: "No room found" })   
            }
        } else {
            res.status(200).json({ status: "success", data: null, message: "No room found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}