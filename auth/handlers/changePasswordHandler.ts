import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../controllers/auth.controller";
import { hashPassword } from "../utils/hashCheckPassword";

/**
 * Change a user password
 * @param req - a request object
 * @param res - a response object
 * @returns void
 */
export default async function changePasswordHandler(req: Request, res: Response) {
    try {
        // let us validate user data
        const userDataSchema = Joi.object().keys({
            username: Joi.string().required,
            password: Joi.string().required,
            code: Joi.string().required
        });

        const {
            username,
            password,
            code,
        } = req.body;

        // validate data
        const result = userDataSchema.validate(req.body);
        // check
        if (!result.error) {
            // escape data
            const userData = {
                username: escape(username),
                password: escape(password),
                code: escape(code)
            }

            let user = await AuthService.getUser({ username: userData.username, code: userData.code });

            if (user === null) {
                res.json({ status: "fail", data: { result: false }, message: "Error: Try again" });
            } else {

                let userResult = await AuthService.updateUserPassword({ password: hashPassword(userData.password) as string, username: userData.username });

                if (userResult[0]) {
                    res.json({ status: "success", data: { result: true }, message: "Password successfully changed" });
                } else {
                    res.json({ status: "fail", data: { result: false }, message: "Error: Try again" });
                }
            }
        } else {
            res.json({ status: "fail", data: null, message: "Error: " + result.error.details });
        }
    } catch (error) {
        console.warn(error);
        res.json({ status: "fail", data: null, message: "Error: " + Error });
    }
}