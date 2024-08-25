import { ProfileService } from "../controllers/profile.controller"
import { NextFunction, Request, Response } from "express";
import { ProfileType } from "../types/types";


export async function getProfileHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.body as ProfileType;
        const profile = await ProfileService.getProfile(id as number);
        if (profile !== null) {
            res.status(200).json({ status: "success", data: { profile }, message: "Profile collected" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No profile found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}