import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";


export async function searchRoomsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { term, page } = req.query as unknown as { term: string, page: number }
        const rooms = await RoomService.searchRooms(term, page);
        if (rooms !== null) {
            // Remember Me" for 15 minutes: res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
            res.cookie("rememberme", term, { secure: false, path: "/", expires: new Date(Date.now() + 900000), httpOnly: false })
            res.status(200).json({ status: "success", data: { rooms }, message: "Hotel created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hotel created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}