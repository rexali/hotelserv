import express from "express";
import { getPromotionHandler } from "../handlers/getPromotionHandler";
import { createPromotionHandler } from "../handlers/createPromitionHandler";
import { removePromotionHandler } from "../handlers/removeFavoriteHandler";
import { getPromotionsHandler } from "../handlers/getPromotionsHandler";
import { getUserPromotionsHandler } from "../handlers/getUserPromotionsHandler";

const promotionRouter = express.Router();

promotionRouter.get("/", getPromotionsHandler);
promotionRouter.get("/:id/users/:userId", getUserPromotionsHandler);
promotionRouter.post("/", createPromotionHandler);
promotionRouter.delete("/:id", removePromotionHandler);
promotionRouter.get("/:id", getPromotionHandler);

export default promotionRouter;