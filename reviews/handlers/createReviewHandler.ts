import { ReviewService } from "../controllers/review.controller"
import { NextFunction, Request, Response } from "express";
import { ReviewType } from "../types/types";

export async function createReviewHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as ReviewType;
        const reviewService = new ReviewService(data);
        const review = await reviewService.createReview();
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, message: "Review created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No review created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}