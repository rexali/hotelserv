import { FavoriteService } from "../controllers/favourite.controller"
import { NextFunction, Request, Response } from "express";


export async function getFavoritesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params as unknown as { userId: number };
        const { page } = req.query as unknown as { page: number }
        const favorite = await FavoriteService.getFavorites(userId,page);
        if (favorite !== null) {
            res.status(200).json({ status: "success", data: { favorite }, message: "Favorites found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No favorites found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}