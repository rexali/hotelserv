import { HotelService } from "../controllers/hotel.controller"
import { NextFunction, Request, Response } from "express";
import { HotelType } from "../types/types";
import multer from "multer";
import { uploadFiles } from "../../utils/uploadFile";
import { filterFilesByName } from "../utils/filterFilesByName";


export async function updateHotelHandler(req: Request, res: Response, next: NextFunction) {
    uploadFiles()(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            throw new Error(err.message)
        } else if (err) {
            // An unknown error occurred when uploading.
            throw new Error(err)
        };
        // Everything went fine, send the file name and other fields to database
        try {
            if (req.files?.length) {  // loop thru the file and add
                // const data = req.body as HotelType;
                let photo = filterFilesByName(req.files, 'photo');
                let document = filterFilesByName(req.files, 'document');
                const data = {
                    ...req.body,
                    photo: photo,
                    document: document
                }
                const { id } = req.params as unknown as { id: number }
                const hotelService = new HotelService(id, data);
                const [affectedCount] = await hotelService.updateHotel() as [affectedCount: number];
                if (affectedCount === 1) {
                    res.status(200).json({ status: "success", data: { affectedCount }, message: "Hotel updated" })
                } else {
                    res.status(200).json({ status: "success", data: null, message: "Not updated" })
                }
            } else {
                console.log(req.files);
            }
        } catch (error) {
            res.status(500).json({ status: "failed", data: null, message: "Error: " + error })
        }
    });

} 