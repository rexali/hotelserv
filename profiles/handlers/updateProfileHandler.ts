import { ProfileService } from "../controllers/profile.controller"
import { NextFunction, Request, Response } from "express";
import { ProfileType } from "../types/types";
import multer from "multer";
import { uploadFile } from "../../utils/uploadFile";


export async function updateProfileHandler(req: Request, res: Response, next: NextFunction) {

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
                const id = req.params.id as unknown as number;
                const data = req.body as ProfileType;
                const profileService = new ProfileService(id, { ...data, image: req.file.filename });
                const [affectedCount] = await profileService.updateProfile() as [affectedCount: number];
                if (affectedCount === 1) {
                    res.status(200).json({ status: "success", data: { affectedCount }, message: "Profile updated" });
                } else {
                    res.status(200).json({ status: "success", data: null, message: "Profile not updated" });
                }
            }

        } catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
        }
    });
} 