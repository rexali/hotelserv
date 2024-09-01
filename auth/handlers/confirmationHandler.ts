import Joi from "joi";
import { AuthService } from "../controllers/auth.controller";
import { Request, Response} from "express";

/**
 * Confirm a user registration
 * @param req - a request object
 * @param res - a response object
 * @returns void
 */
export default async function confirmRegisterationHandler(req: Request, res: Response) {
    try {
        //  user data schema
        const userDataSchema = Joi.object().keys({
            email: Joi.string().required,
            code: Joi.string().required,
        });

        const {
            email,
            code,
        } = req.body;
        // validate now
        const result = userDataSchema.validate(req.body);
        if (!result.error) {
            // user data
            const userData = {
                // escape data
                username: escape(email),
                code: escape(code),
            }

            let user = await AuthService.getUser({ username: userData.username, code: userData.code });

            if (user === null) {
                res.json({ status: "fail", data: { result: false }, message: "Confirmation fail" });
            } else {
                res.json({ status: "success", data: { result: true }, message: "Registeration confirmed successfully" });
            }
        } else {
            res.json({ status: "fail", data: null, message: "Error: " + result.error.details });
        }

    } catch (error) {
        console.warn(error);
        res.json({ status: "fail", data: null, message: "Error: " + Error });
    }
}
