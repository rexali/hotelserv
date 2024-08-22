import { Request, Response } from "express";
import { HomeService } from "../controllers/home.controller";
import { Terms } from "../../hotels/types/types";

export async function homeHandler(req: Request, res: Response) {
    try {
        let popularHotelRoomsPromise = new Promise(async (resolve, _) => {
            resolve((await HomeService.popularHotelRooms()).slice(0,4)) // firts four popular rooms
        });
        let recommendedHotelRoomsPromise = new Promise(async (resolve, _) => {
            const { terms } = req.cookies["rememberme"] as unknown as { terms: Terms }
            resolve(await HomeService.recommendedHotelRooms(terms))
        });
        let sponsoredHotelRooms = new Promise(async (resolve, _) => {

            resolve(await HomeService.sponsoredHotelRoom())
        });

        let [popular, recommended, sponsored] = await Promise.all([
            popularHotelRoomsPromise,
            recommendedHotelRoomsPromise,
            sponsoredHotelRooms
        ]);

        res.status(200).json({ status: "success", data: { popular, recommended, sponsored }, message: "Home page data retrieved" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}