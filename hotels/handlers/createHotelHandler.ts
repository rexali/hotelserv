import { HotelService } from "../controllers/hotel.controller"
import { NextFunction, Request, Response } from "express";
import { uploadFiles } from "../../utils/uploadFile";
import multer from "multer";
import { filterFilesByName } from "../utils/filterFilesByName";


export function createHotelHandler(req: Request, res: Response, next: NextFunction) {
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
                let document =filterFilesByName(req.files, 'document');
                const data = {
                    ...req.body,
                    photo: photo,
                    document: document
                }
                const hotelService = new HotelService(data.id, data);
                const hotel = await hotelService.createHotel();
                if (hotel !== null) {
                    res.status(200).json({ status: "success", data: { hotel }, message: "Hotel created" })
                } else {
                    res.status(200).json({ status: "success", data: null, message: "No hotel created" })
                }
            } else {
                console.log(req.files);
            }
        } catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
        }
    })
}