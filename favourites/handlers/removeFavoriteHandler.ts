
import { FavoriteService } from "../controllers/favourite.controller"
import { NextFunction, Request, Response } from "express";


export async function removeFavoriteHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { roomId, userId } = req.params as unknown as { roomId: number, userId: number };
        const favorite = await FavoriteService.removeFavorite(roomId, userId);
        if (favorite !== null || undefined) {
            res.status(200).json({ status: "success", data: { favorite }, favorite: "Favourite removed " })
        } else {
            res.status(200).json({ status: "success", data: null, favorite: "No favourite removed" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, favorite: "Error: " + error })
    }

}