import { NextFunction, Request, Response } from "express";
import { ReviewService } from "../controllers/review.controller";

export async function getReviewsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number };
        const review = await ReviewService.getReviews(page);
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, message: "Reviews found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No review found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}