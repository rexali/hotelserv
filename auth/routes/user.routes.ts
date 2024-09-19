import express, { NextFunction, Request, Response } from "express"
import passport from "../../config/passport.config";
import { verifyCsrfProtection } from "../../utils/csrfProtection";
import registerUserHandler from "../handlers/registerUserHandler";
import logOutUserHandler from "../handlers/logOutUserHandler";
import forgetPasswordRequestHandler from "../handlers/forgetPasswordRequestHandler";
import changePasswordHandler from "../handlers/changePasswordHandler";
import confirmRegisterationHandler from "../handlers/confirmationHandler";
import verifyTokenHandler from "../handlers/verifyTokenHandler";
import logInHandler from "../handlers/logInHandler";

const authRouter = express.Router();

// registration route
authRouter.post(
    "/register",
    verifyCsrfProtection,
    registerUserHandler
);

// logout route 
authRouter.get(
    "/logout",
    logOutUserHandler
);

// forget password request route
authRouter.get(
    "/forget-password",
    forgetPasswordRequestHandler
);

// confirm registeration route
authRouter.get(
    "/confirm-registeration",
    confirmRegisterationHandler
);

// change password route
authRouter.post(
    "/change-password",
    verifyCsrfProtection,
    changePasswordHandler
);

// verification route
authRouter.post(
    "/verify-token",
    verifyTokenHandler
);

// local route
authRouter.post(
    "/login/local",
     logInHandler
    );
// facebook route
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

// apple
authRouter.get("/login/apple", passport.authenticate('apple'));

authRouter.get(
    '/oauth2/redirect/apple',
    passport.authenticate('apple', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.redirect('/');
        // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
    }
);

// authRouter.post("/oauth2/redirect/apple", function(req, res, next) {
//     passport.authenticate('apple', function(err:any, user:any, info:any) {
//         if (err) {
//             if (err == "AuthorizationError") {
//                 res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
//                 <a href=\"/login\">Sign in with Apple</a>");
//             } else if (err == "TokenError") {
//                 res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
//                 <a href=\"/login\">Sign in with Apple</a>");
//             } else {
//                 res.send(err);
//             }
//         } else {
//             if (req.body.user) {
//                 // Get the profile info (name and email) if the person is registering
//                 res.json({
//                     user: req.body.user,
//                     idToken: user
//                 });
//             } else {
//                 res.json(user);
//             }			
//         }
//     })(req, res, next);
// });

export default authRouter;