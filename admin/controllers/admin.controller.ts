import { User } from "../../auth/models/user.model";
import Profile from "../../profiles/models/profile.model";
import { ProfileType } from "../../styles/styles";

export class AdminService {

    private id: string;
    private data?: ProfileType;

    constructor(id: string, data?: ProfileType) {
        this.id = id;
        this.data = data
    }

    static async getAdminProfile(profileId: string) {
        try {
            return await Profile.findOne({
                where: {
                    id: profileId
                },
                include: {
                    model: User,
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    async createAdminProfile() {
        try {
            return await Profile.create({ ...this.data });
        } catch (error) {
            console.warn(error);
        }
    }

    async updateAminProfile() {
        try {
            return await Profile.update({ ...this.data }, { where: { id: this.id } });
        } catch (error) {
            console.warn(error);
        }
    }
}