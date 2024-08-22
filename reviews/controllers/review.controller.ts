import Review from "../models/review.model";
import { ReviewType } from "../types/types";

export class ReviewService {

    id: number;
    data: ReviewType;

    constructor(id: number, data: ReviewType) {
        this.id = id;
        this.data = data;
    };

    async createReview() {
        try {
            return await Review.create({ ...this.data })
        } catch (error) {
            console.warn(error);
        }
    };

    async updateReview() {
        try {
            return await Review.update({ ...this.data }, { where: { id: this.id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async removeReview(id: number) {
        try {
            return await Review.destroy({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getReviews(page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Review.findAll({
                limit: 10,
                offset
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getUserReviews(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Review.findAll({
                limit: 10,
                offset,
                where: {
                    UserId: userId
                }
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getReview(id: number) {
        try {
            return await Review.findOne({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };


}
