import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";
import { RoomType } from "../types/types";


export async function updateRoomHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, ...rest } = req.body as RoomType;
        const roomService = new RoomService(id as number, rest);
        const room = await roomService.editRoom();
        if (room !== null) {
            res.status(200).json({ status: "success", data: { room }, message: "Hotel updated" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "Not updated" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}