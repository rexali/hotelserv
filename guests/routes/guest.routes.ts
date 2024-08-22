import express from "express";
import { createGuestHandler } from "../handlers/createGuestHandlers";
import { getGuestHandler } from "../handlers/getGuestHandler";
import { updateGuestHandler } from "../handlers/updateGuestHandler";
import { getGuestsHandler } from "../handlers/getGuestsHandler";

const guestRouter = express.Router();

guestRouter.post("/", createGuestHandler);
guestRouter.get("/:id", getGuestHandler);
guestRouter.get("/", getGuestsHandler);
guestRouter.patch("/:id", updateGuestHandler);

export default guestRouter;
