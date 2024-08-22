import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";
import { RoomType } from "../types/types";


export async function isRoomAvailableHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as any;
        const room = await RoomService.getRoom(id) as unknown as RoomType;
        if (room.availabilty) {
            res.status(200).json({ status: "success", data: { availibility: room.availabilty }, message: "Room available" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "Room not available" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}