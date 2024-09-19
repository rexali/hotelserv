import { ProfileService } from "../controllers/profile.controller"
import { NextFunction, Request, Response } from "express";
import { ProfileType } from "../types/types";
import { uploadFile } from "../../utils/uploadFile";
import multer from "multer";


export async function createProfileHandler(req: Request, res: Response, next: NextFunction) {
    uploadFile('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            throw new Error(err.message)
        } else if (err) {
            // An unknown error occurred when uploading.
            throw new Error(err)
        };
        // Everything went fine, send the file name and other fields to database
        try {
            if (req.file?.filename) {
                const { id, ...rest } = req.body as ProfileType;
                const profileService = new ProfileService(id as number, { ...rest, image: req.file.filename});
                const profile = await profileService.createProfile();
                if (profile !== null) {
                    res.status(200).json({ status: "success", data: { profile }, message: "Profile created" });
                } else {
                    res.status(200).json({ status: "success", data: null, message: "Profile not created" });
                }
            }

        } catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
        }
    })
}