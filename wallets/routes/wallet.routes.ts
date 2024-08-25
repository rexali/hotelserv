import express from "express";

import { getWalletHandler } from "../handlers/getWalletHandler";
import { createWalletHandler } from "../handlers/createWalletHandler";
import { getWalletsHandler } from "../handlers/getWalletsHandler";
import { getUserWalletsHandler } from "../handlers/getUserWalletsHandler";
import { updateWalletHandler } from "../handlers/updateWalletHandler";

const walletRouter = express.Router();

walletRouter.get("/", getWalletsHandler);
walletRouter.get("/:id/users/:userId", getUserWalletsHandler);
walletRouter.post("/", createWalletHandler);
walletRouter.patch("/:id", updateWalletHandler);
walletRouter.get("/:id", getWalletHandler);

export default walletRouter;