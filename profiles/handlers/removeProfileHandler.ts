import { ProfileService } from "../controllers/profile.controller"
import { NextFunction, Request, Response } from "express";
import { ProfileType } from "../types/types";


export async function removeProfileHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.body as ProfileType;
        const profile = await ProfileService.removeProfile(id as number);
        if (profile !== null) {
            res.status(200).json({ status: "success", data: { profile }, message: "Profile removed" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No profile removed" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}