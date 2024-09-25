import User from "../models/user.model";
import { UserType } from "../types/types";

export class AuthService {
    data: UserType;
    constructor(data: UserType) {
        this.data = data;
    }

    async createUser() {
        return await User.create(
            {
                ...this.data,
            }
        );
    }

    static async updateUserPassword(data: { password: string, username: string }) {
        return await User.update(
            {
                password: data.password
            },
            {
                where: { username: data.username }
            });
    }

    static async updateUserCode(data: { username: string, code: string }) {
        return await User.update(
            {
                code: data.code
            },
            {
                where: { username: data.username }
            });
    }

    static async getUser(data: { username: string, code?: string }) {
        if (data.username && data.code) {
            return await User.findOne({
                where: {
                    username: data.username, // email
                    code: data.code
                }
            })
        } else {
            return await User.findOne({
                where: {
                    username: data.username, // email
                }
            })
        }

    }

    static async getAllUsers(page: number = 1) {
        const limit = 10;
        const offset = (page - 1) * limit;
        return await User.findAll({
            limit,
            offset,
            attributes:["id","username"]
        });
    }

    static async removeUser(id: string) {
        return await User.destroy({
            where: {
                id: id
            }
        })
    }

}