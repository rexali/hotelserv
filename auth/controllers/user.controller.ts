// import { Request, Response, NextFunction } from "express";
// import { checkPassword, hashPassword } from "../utils/hashCheckPassword";
// import { v4 as uuidV4 } from "uuid";
// import jwt from "jsonwebtoken";
// import Joi from "joi";
// import { escape } from "html-escaper";
// import { registrationMSQ } from "../utils/registerationMSQ";
// import { Mutex } from "async-mutex";
// import { sendMail } from "../../utils/sendMail";
// import { UserType } from "../types/types";
// import User from "../models/user.model";
// import { AuthService } from "./auth.controller";

// const mutex = new Mutex();
// /**
//  * Add new user
//  * @param req - a request
//  * @param res - a response
//  * @returns void
//  */
// export async function registerUser(req: Request, res: Response) {
//     // acquire path to perform operation to prevent race condition
//     const release = await mutex.acquire();
//     try {
//         const code = uuidV4();
//         // let us validate user data
//         const userDataSchema = Joi.object().keys({
//             username: Joi.string().required,
//             password: Joi.string().required,
//             role: Joi.string().required,
//             permission: Joi.array<string>(),
//             status: Joi.string().required,
//         });

//         const validationResult = userDataSchema.validate(req.body);

//         if (validationResult.error) {
//             res.status(200).json({ error: validationResult.error.details });
//         } else {
//             const {
//                 username,
//                 password,
//                 role,
//                 permission,
//                 status,
//             } = req.body as UserType;
//             // let us sanitise user data now
//             const userData: UserType = {
//                 username: escape(username),
//                 password: escape(password),
//                 role: escape(role),
//                 permission: permission,
//                 status: escape(status),
//                 code: code,
//             }

//             const authData = {
//                 ...userData,
//                 password: hashPassword(userData.password) as string, 
//                 code
//             }
//             const authService = new AuthService(authData)
//             const user = await authService.createUser();
//             if (user !== null) {
//                 res.status(200).json({ status: 'success', data: { user }, messsage: 'Registeration successful' });
//             } else {
//                 res.status(200).json({ status: 'success', data: null, messsage: 'Try again' });
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(200).json({ status: 'success', data: null, messsage: 'Error: ' + error });
//     } finally {
//         // release path for others
//         release()
//     }
// }

// /**
//  * Log in to verify user credentials
//  * @param username email of the user
//  * @param password password of the user
//  * @param done a callback
//  */
// export function loginToVerifyUser(username: string, password: string, done: Function) {
//     // let us sanitise
//     const userDataSchema = Joi.object().keys({
//         username: Joi.string().required,
//         password: Joi.string().required,
//     });

//     const validationResult = userDataSchema.validate({ username, password });

//     if (validationResult.error) {

//         if (validationResult.error) return done(null, false, validationResult.error.details);

//     } else {
//         // let us sanitise user data now
//         try {
//             const userData = {
//                 username: escape(username),
//                 password: escape(password),
//             }

//             User.findOne({ where: { username: userData.username } }).then((user: any) => {
//                 if (!user) {
//                     return done(null, false, { message: "Incorrect Username or password" });
//                 }
//                 if (!checkPassword(userData.password, user.password)) {
//                     return done(null, false, { message: "Incorrect Username or password" });
//                 }

//                 const token = jwt.sign({
//                     userId: user.id,
//                     role: user.role,
//                     permission: user.permission
//                 }, process.env["SECRET_KEY"] as string, { expiresIn: '1h' });

//                 const userPlusToken = { username, status: user.status, code: user.code, token }

//                 return done(null, userPlusToken);
//             }).catch(err => {
//                 if (err) {
//                     return done(err)
//                 };
//             })
//         } catch (err) {
//             console.log(err)
//             if (err) {
//                 return done(err)
//             };
//         }
//     }
// }

// /**
//  * Authorise a user
//  * @param req - client request 
//  * @param res - server response
//  * @param next - net funtion
//  * @returns a boolean value
//  */
// export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const bearerToken = req.headers["authorization"] as string;
//         const token = bearerToken?.split(" ")[1] ?? "";
//         if (!token) {
//             return false;
//         } else {
//             const decoded = jwt.verify(token, process.env['SECRET_KEY'] as string) as { userId: number, role: string, permission: [string] };
//             if (decoded.role === "admin" && decoded.permission.includes("write")) {
//                 return true
//             }
//             return false;
//         }
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
// }

// export const logOutUser = (req: Request, res: Response) => {
//     req.logout({}, function (err) {
//         console.log(err)
//     });
//     req.session.destroy(function (err) {
//         console.log(err)
//     });
//     res.status(200).json({ status: 'success', data: null, messsage: 'Logged out' });
//     // res.redirect("/")
// }

// /**
//  * Request a user password change
//  * @param req - a request object
//  * @param res - a response object
//  * @returns void
//  */
// export async function requestPasswordChange(req: Request, res: Response) {
//     try {
//         const { email } = req.body;
//         // let us validate user data
//         const userDataSchema = Joi.object().keys({
//             email: Joi.string().required,
//         });
//         // validate data
//         const result = userDataSchema.validate(req.body);
//         if (result.error) {
//             res.json({ status: "fail", data: null, message: "Error: " + result.error.details });
//         } else {
//             const userData = {
//                 // escape the email
//                 username: escape(email)
//             }
//             // genrate random code
//             const code = uuidV4();
//             //  html message
//             const html: string = registrationMSQ(email, code);
//             // check if user exist
//             let user = await AuthService.getUser({ username: userData.username});
//             if (user === null) {
//                 res.json({ status: "fail", data: null, message: "Email does not exist" });
//             } else {
//                 const user = await AuthService.updateUserCode({username:email,code:code});
//                 if (user === null) {
//                     res.json({ status: "fail", data: null, message: "Error: Try again" });
//                 } else {
//                     const result = await sendMail(email, "Change..", "html", "Homes4U", html);
//                     if (result) {
//                         res.json({ status: "success", data: { result: true }, message: "Check your mail inbox" });
//                     } else {
//                         res.json({ status: "fail", data: { result: false }, message: "Error: Try again" });
//                     }
//                 }
//             }
//         }

//     } catch (error) {
//         console.warn(error);
//         res.json({ status: "fail", data: null, message: "Error: " + Error });
//     }
// }

// /**
//  * Change a user password
//  * @param req - a request object
//  * @param res - a response object
//  * @returns void
//  */
// export async function changePassword(req: Request, res: Response) {
//     try {
//         // let us validate user data
//         const userDataSchema = Joi.object().keys({
//             username: Joi.string().required,
//             password: Joi.string().required,
//             code: Joi.string().required
//         });

//         const {
//             username,
//             password,
//             code,
//         } = req.body;

//         // validate data
//         const result = userDataSchema.validate(req.body);
//         // check
//         if (!result.error) {
//             // escape data
//             const userData = {
//                 username: escape(username),
//                 password: escape(password),
//                 code: escape(code)
//             }

//             let user = await AuthService.getUser({ username: userData.username, code: userData.code });

//             if (user === null) {
//                 res.json({ status: "fail", data: { result: false }, message: "Error: Try again" });
//             } else {

//                 let userResult = await AuthService.updateUserPassword({ password: hashPassword(userData.password) as string, username: userData.username });

//                 if (userResult[0]) {
//                     res.json({ status: "success", data: { result: true }, message: "Password successfully changed" });
//                 } else {
//                     res.json({ status: "fail", data: { result: false }, message: "Error: Try again" });
//                 }
//             }
//         } else {
//             res.json({ status: "fail", data: null, message: "Error: " + result.error.details });
//         }
//     } catch (error) {
//         console.warn(error);
//         res.json({ status: "fail", data: null, message: "Error: " + Error });
//     }
// }

// /**
//  * Confirm a user registration
//  * @param req - a request object
//  * @param res - a response object
//  * @returns void
//  */
// export async function confirmRegisteration(req: Request, res: Response) {
//     try {
//         //  user data schema
//         const userDataSchema = Joi.object().keys({
//             email: Joi.string().required,
//             code: Joi.string().required,
//         });

//         const {
//             email,
//             code,
//         } = req.body;
//         // validate now
//         const result = userDataSchema.validate(req.body);
//         if (!result.error) {
//             // user data
//             const userData = {
//                 // escape data
//                 username: escape(email),
//                 code: escape(code),
//             }

//             let user = await AuthService.getUser({ username: userData.username, code: userData.code });

//             if (user === null) {
//                 res.json({ status: "fail", data: { result: false }, message: "Confirmation fail" });
//             } else {
//                 res.json({ status: "success", data: { result: true }, message: "Registeration confirmed successfully" });
//             }
//         } else {
//             res.json({ status: "fail", data: null, message: "Error: " + result.error.details });
//         }

//     } catch (error) {
//         console.warn(error);
//         res.json({ status: "fail", data: null, message: "Error: " + Error });
//     }
// }
