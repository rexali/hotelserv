import express from "express";

import { createFavoriteHandler } from "../handlers/createFavoriteHandler";
import { removeFavoriteHandler } from "../handlers/removeFavoriteHandler";
import { getFavoritesHandler } from "../handlers/getFavoritesHandler";
import { clearFavoriteHandler } from "../handlers/clearFavoritesHandler";

const favoriteRouter = express.Router();

favoriteRouter.post("/", createFavoriteHandler);
favoriteRouter.delete("/:roomId/:userId", removeFavoriteHandler);
favoriteRouter.get("/:userId", getFavoritesHandler);
favoriteRouter.delete("/:userId", clearFavoriteHandler);

export default favoriteRouter;