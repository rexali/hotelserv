import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";
import { RoomType } from "../types/types";


export function createRoomHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, ...rest } = req.body as RoomType;
        const roomService = new RoomService(id as number, rest);
        const room = roomService.createRoom();
        if (room !== null) {
            res.status(200).json({ status: "success", data: { room }, message: "Room created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No room created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}