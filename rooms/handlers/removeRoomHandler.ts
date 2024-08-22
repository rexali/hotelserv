import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";


export async function removeRoomHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as any;
        const room = await RoomService.removeRoom(id);
        if (room !== null) {
            res.status(200).json({ status: "success", data: { room }, message: "Room deleted" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No room deleted" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}