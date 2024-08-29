import { GuestService } from "../controllers/guest.controller"
import { NextFunction, Request, Response } from "express";
import { GuestType } from "../types/types";


export async function updateGuestHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as GuestType;
        const guestService = new GuestService(data.id, data);
        const guest = await guestService.updateGuest();
        if (guest !== null) {
            res.status(200).json({ status: "success", data: { guest }, message: "Guest updated" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "Update failed" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}