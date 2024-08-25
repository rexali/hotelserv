import { ProfileService } from "../controllers/profile.controller"
import { NextFunction, Request, Response } from "express";
import { ProfileType } from "../types/types";


export async function updateProfileHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id, ...rest } = req.body as ProfileType;
        const profileService = new ProfileService(id as number, rest);
        const profile = await profileService.updateProfile();
        if (profile !== null) {
            res.status(200).json({ status: "success", data: { profile }, message: "Profile updated" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "Update failed" }) 
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}