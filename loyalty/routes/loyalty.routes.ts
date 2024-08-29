import express from "express";

import { createLoyaltyHandler } from "../handlers/createLoyaltyHandler";
import { getLoyaltyHandler } from "../handlers/getLoyaltyHandler";
import { getLoyaltiesHandler } from "../handlers/getLoyaltiesHandler";
import { removeLoyaltyHandler } from "../handlers/removeLoyaltyHandler";
import { getUserLoyaltyHandler } from "../handlers/getUserLoyaltyHandler";
import { updateLoyaltyHandler } from "../handlers/updateLoyaltyHandler";

const loyaltyRouter = express.Router();

loyaltyRouter.post("/", createLoyaltyHandler);
loyaltyRouter.get("/", getLoyaltiesHandler);
loyaltyRouter.get("/:id", getLoyaltyHandler);
loyaltyRouter.patch("/:id", updateLoyaltyHandler);
loyaltyRouter.delete("/:id", removeLoyaltyHandler);
loyaltyRouter.get("/:id/users/:userId", getUserLoyaltyHandler);

export default loyaltyRouter;