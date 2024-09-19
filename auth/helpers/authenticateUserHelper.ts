import jwt from "jsonwebtoken";
import Joi from "joi";
import { checkPassword } from "../utils/hashCheckPassword";
import User from "../models/user.model";
import { escape } from "html-escaper";
import { padToken } from "../utils/secureJWToken";

/**
 * Log in to verify user credentials
 * @param username email of the user
 * @param password password of the user
 * @param done a callback
 */
export function authenticateUserHelper(username: string, password: string, done: Function) {
    // let us sanitise
    const userDataSchema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    const validationResult = userDataSchema.validate({ username, password });

    if (validationResult.error) {

        if (validationResult.error) return done(null, false, validationResult.error.message);

    } else {
        // let us sanitise user data now
        try {
            const userData = {
                username: escape(username),
                password: escape(password),
            }

            User.findOne({ where: { username: userData.username } }).then((user) => {
                if (!user) {
                    return done(null, false, { message: "Incorrect Username or password" });
                }
                if (!checkPassword(userData.password, user.password)) {
                    return done(null, false, { message: "Incorrect Username or password" });
                }
  
                const token = jwt.sign({
                    userId: user.id,
                    role: user.role,
                    username: user.username,
                    permission: user.permission
                }, process.env["SECRET_KEY"] as string, { expiresIn: '24h' }) as string;

                const userPlusToken = { username, status: user.status, code: user.code, token: padToken(token) }

                return done(null, userPlusToken);
            }).catch(err => {
                if (err) {
                    return done(err)
                };
            })
        } catch (err) {
            console.log(err)
            if (err) {
                return done(err)
            };
        }
    }
}