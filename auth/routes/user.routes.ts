import express, { NextFunction, Request, Response } from "express"
import { registerUser, getUser, logOutUser } from "../controllers/user.controller";
import passport from "../../config/passport.config";
import { verifyCsrfProtection } from "../../utils/csrfProtection";
import { protectRoute } from "../utils/protectRoute";

const authRouter = express.Router();

authRouter.post(
    "/register",
    verifyCsrfProtection,
    registerUser
);

authRouter.get(
    "/user",
    protectRoute,
    getUser
);

authRouter.get(
    "/logout",
    logOutUser
);

authRouter.post(
    "/login/local",
    function (req: Request, res: Response, next: NextFunction) {
        passport.authenticate(
            'local',
            {
                failureRedirect: '/login',
                failureMessage: true
            },
            function (err: any, user: any, info: any, status: any) {
                if (err) { return next(err) }
                if (!user) {
                    res.status(200).json({ status: "success", data: { result: false, user: null }, message: "Login failed" })
                    // return res.redirect('/signin') 
                }else{
                    res.status(200).json({ status: "success", data: { result: true, user }, message: "Login successful" })
                    // res.redirect('/dashboard');
                }
            })(req, res, next);
    }
);

authRouter.get(
    "/login/facebook",
    passport.authenticate('facebook'),
);

authRouter.get(
    "/oauth2/redirect/facebook",
    passport.authenticate('facebook', { failureRedirect: '/login', failureMessage: true }),
    function (req, res, next) {
        res.redirect("/dashboard")
        // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
    }
);

// google route
authRouter.get(
    '/login/google',
    passport.authenticate('google', { scope: ['profile'] })
);

authRouter.get(
    '/oauth2/redirect/google',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
        // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
    }
);

// twitter route
authRouter.get(
    '/login/twitter',
    passport.authenticate('twitter'),
    // function (req: Request, res: Response, next: NextFunction) {
    //     try {
    //         passport.authenticate('twitter');
    //         // next()
    //     } catch (error) {
    //         res.status(500).json({ status: "fail", data: null, message: "Error: "+error })
    //     }
    // }
);
authRouter.get(
    '/oauth2/redirect/twitter',
    passport.authenticate('twitter', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.redirect('/');
        // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
    }
);

// LinkedIn
authRouter.get(
    '/login/linkedin',
    passport.authenticate('linkedin', { state: '', })
);

authRouter.get(
    '/oauth2/redirect/linkedin',
    passport.authenticate('linkedin', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.redirect('/');
        // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
    }
);

export default authRouter;