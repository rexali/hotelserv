import express from "express";

import { getReviewsHandler } from "../handlers/getReviewsHandler";
import { createReviewHandler } from "../handlers/createReviewHandler";
import { getReviewHandler } from "../handlers/getReviewHandler";
import { updateReviewHandler } from "../handlers/updateReviewHandler";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviewsHandler);
reviewRouter.patch("/:id", updateReviewHandler);
reviewRouter.post("/", createReviewHandler);
reviewRouter.get("/:id", getReviewHandler);

export default reviewRouter;