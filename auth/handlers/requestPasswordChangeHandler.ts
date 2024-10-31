import Joi from "joi";
import { Request, Response} from "express";
import { v4 as uuidV4 } from "uuid";
import { registrationMSQ } from "../utils/registerationMSQ";
import { AuthService } from "../controllers/auth.controller";
import { sendMail } from "../../utils/sendMail";

/**
 * Request a user password change
 * @param req - a request object
 * @param res - a response object
 * @returns void
 */
export async function requestPasswordChange(req: Request, res: Response) {
    try {
        const { email } = req.body;
        // let us validate user data
        const userDataSchema = Joi.object().keys({
            email: Joi.string().required,
        });
        // validate data
        const result = userDataSchema.validate(req.body);
        if (result.error) {
            res.json({ status: "fail", data: null, message: "Error: " + result.error.details });
        } else {
            const userData = {
                // escape the email
                username: escape(email)
            }
            // genrate random code
            const code = uuidV4();
            //  html message
            const html: string = registrationMSQ(email, code);
            // check if user exist
            let user = await AuthService.getUser({ username: userData.username});
            if (user === null) {
                res.json({ status: "fail", data: null, message: "Email does not exist" });
            } else {
                const user = await AuthService.updateUserCode({username:email,code:code});
                if (user === null) {
                    res.json({ status: "fail", data: null, message: "Error: Try again" });
                } else {
                    const result = await sendMail(email, "Change..", "html", "Homes4U", html);
                    if (result) {
                        res.json({ status: "success", data: { result: true }, message: "Check your mail inbox" });
                    } else {
                        res.json({ status: "fail", data: { result: false }, message: "Error: Try again" });
                    }
                }
            }
        }

    } catch (error) {
        console.warn(error);
        res.json({ status: "fail", data: null, message: "Error: " + Error });
    }
}
