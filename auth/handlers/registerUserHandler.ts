import { Mutex } from "async-mutex";
import Joi from "joi";
import { AuthService } from "../controllers/auth.controller";
import { UserType } from "../types/types";
import { hashPassword } from "../utils/hashCheckPassword";
import { v4 as uuidV4 } from "uuid";
import { Request, Response, NextFunction } from "express";

const mutex = new Mutex();
/**
 * Add new user
 * @param req - a request
 * @param res - a response
 * @returns void
 */
export default async function registerUserHandler(req: Request, res: Response) {
    // acquire path to perform operation to prevent race condition
    const release = await mutex.acquire();
    try {
        const code = uuidV4();
        // let us validate user data
        const userDataSchema = Joi.object().keys({
            username: Joi.string().required,
            password: Joi.string().required,
            role: Joi.string().required,
            permission: Joi.array<string>(),
            status: Joi.string().required,
        });

        const validationResult = userDataSchema.validate(req.body);

        if (validationResult.error) {
            res.status(200).json({ error: validationResult.error.details });
        } else {
            const {
                username,
                password,
                role,
                permission,
                status,
            } = req.body as UserType;
            // let us sanitise user data now
            const userData: UserType = {
                username: escape(username),
                password: escape(password),
                role: escape(role),
                permission: permission,
                status: escape(status),
                code: code,
            }

            const authData = {
                ...userData,
                password: hashPassword(userData.password) as string, 
                code
            }
            const authService = new AuthService(authData)
            const user = await authService.createUser();
            if (user !== null) {
                res.status(200).json({ status: 'success', data: { user }, messsage: 'Registeration successful' });
            } else {
                res.status(200).json({ status: 'success', data: null, messsage: 'Try again' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({ status: 'success', data: null, messsage: 'Error: ' + error });
    } finally {
        // release path for others
        release()
    }
}
