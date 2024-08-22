import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";


export async function getRoomHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as any;
        const rooms = await RoomService.getRoom(id);
        if (rooms !== null) {
            res.status(200).json({ status: "success", data: { rooms }, message: "Room found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No room found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}