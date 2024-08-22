import { GuestService } from "../controllers/guest.controller"
import { NextFunction, Request, Response } from "express";


export async function getGuestsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {page} = req.query as unknown as {page:number};
        const guest = await GuestService.getGuests(page);
        if (guest !== null) {
            res.status(200).json({ status: "success", data: { guest }, message: "Guest found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No guest found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}