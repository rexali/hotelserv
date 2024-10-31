
import { FavoriteService } from "../controllers/favourite.controller";
import { NextFunction, Request, Response } from "express";

export async function clearFavoriteHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params as unknown as { userId: number };
        const favorite = await FavoriteService.clearFavorite(userId);
        if (favorite !== null || undefined) {
            res.status(200).json({ status: "success", data: { favorite }, favorite: "Favourite cleared" });
        } else {
            res.status(200).json({ status: "success", data: null, favorite: "No favourite cleared" });
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, favorite: "Error: " + error });
    }
}