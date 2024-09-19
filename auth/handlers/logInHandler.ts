import { NextFunction, Response, Request } from "express";
import passport from "../../config/passport.config";

export default function logInHandler(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
        'local',
        {
            failureRedirect: '/login',
            failureMessage: true
        },

        function (err: any, user: any, info: any, status: any) {
            if (err) {
                return next(err)
            }
            if (!user) {
                res.status(400).json({ status: "success", data: { result: false, user: null }, message: "Login failed" })
                // return res.redirect('/signin') 
            } else {
                res.status(200).json({ status: "success", data: { result: true, user }, message: "Login successful" })
                // res.redirect('/dashboard');
            }
        }
    )(req, res, next);
}
