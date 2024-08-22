import { ReviewService } from "../controllers/review.controller"
import { NextFunction, Request, Response } from "express";
import { ReviewType } from "../types/types";

export async function getReviewHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params as unknown as {id:number};
        const review = await ReviewService.getReview(id) as Partial<ReviewType>;
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, message: "Reviews found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No review(s)" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}