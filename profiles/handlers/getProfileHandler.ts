import { ProfileService } from "../controllers/profile.controller"
import { NextFunction, Request, Response } from "express";


export async function getProfileHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as { id: number };
        const profile = await ProfileService.getProfile(id);
        if (profile !== null) {
            res.status(200).json({ status: "success", data: { profile }, message: "Profile collected" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No profile found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}