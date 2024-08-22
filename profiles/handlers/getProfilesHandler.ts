import { ProfileService } from "../controllers/profile.controller"
import { NextFunction, Request, Response } from "express";
import { ProfileType } from "../types/types";


export async function getProfilesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {page} = req.query as unknown as {page:number};
        const profiles = await ProfileService.getProfiles(page) as unknown as ProfileType[];
        if (profiles !== null) {
            res.status(200).json({ status: "success", data: { profiles }, message: "Profile found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No profile(s) found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}