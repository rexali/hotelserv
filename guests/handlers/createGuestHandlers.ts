import { GuestService } from "../controllers/guest.controller"
import { NextFunction, Request, Response } from "express";
import { GuestType } from "../types/types";


export async function createGuestHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, ...rest } = req.body as GuestType;
        const guestService = new GuestService(id as number, rest);
        const guest = await guestService.createGuest();
        if (guest !== null) {
            res.status(200).json({ status: "success", data: { guest }, message: "Guest created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No guest created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}