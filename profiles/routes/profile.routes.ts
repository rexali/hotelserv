import express from "express";
import { createProfileHandler } from "../handlers/createProfileHandler";
import { getProfileHandler } from "../handlers/getProfileHandler";
import { updateProfileHandler } from "../handlers/updateProfileHandler";
import { getProfilesHandler } from "../handlers/getProfilesHandler";
import { removeProfileHandler } from "../handlers/removeProfileHandler";

// router instance
const profileRouter = express.Router();
// profile creation routes
profileRouter.post("/", createProfileHandler);
profileRouter.get("/:id", getProfileHandler);
profileRouter.get("/", getProfilesHandler);
profileRouter.delete("/:id", removeProfileHandler);
profileRouter.patch("/:id", updateProfileHandler)

export default profileRouter;
 