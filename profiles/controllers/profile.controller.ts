import User from "../../auth/models/user.model";
import { limit } from "../../constants/constants";
import Profile from "../../profiles/models/profile.model";
import { ProfileType } from "../types/types";

export class ProfileService {

    private id: number;
    private data: ProfileType;

    constructor(id: number, data: ProfileType) {
        this.id = id;
        this.data = data
    }

    static async getProfile(id: number) {
        try {
            return await Profile.findOne({
                where: {
                    id: id
                },
                include: {
                    model: User,
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    static async getProfiles(page: number = 1) {
        try {
            const offset = (page-1)*limit;
            return await Profile.findAll({
                limit,
                offset,
                include: {
                    model: User,
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    async createProfile() {
        try {
            return await Profile.create({
               ...this.data
            });
        } catch (error) {
            console.warn(error);
        }
    }

    async updateProfile() {
        try {
            return await Profile.update({ ...this.data }, { where: { id: this.id } });
        } catch (error) {
            console.warn(error);
        }
    }

    static async removeProfile(id: number) {
        try {
            return await Profile.destroy({ where: { id: id } });
        } catch (error) {
            console.warn(error);
        }
    }
}