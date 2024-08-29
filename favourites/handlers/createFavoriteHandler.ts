import { FavoriteService } from "../controllers/favourite.controller"
import { NextFunction, Request, Response } from "express";
import { FavoriteType } from "../types/types";


export async function createFavoriteHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as FavoriteType;
        const favouriteService = new FavoriteService(data.id, data);
        const favorite = await favouriteService.createFavorite();
        if (favorite !== null) {
            res.status(200).json({ status: "success", data: { favorite }, message: "Favourtite found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No favorite found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}