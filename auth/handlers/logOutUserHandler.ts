import { Request, Response, NextFunction } from "express";

export default function logOutUserHandler(req: Request, res: Response){
    req.logout({}, function (err) {
        console.log(err)
    });
    req.session.destroy(function (err) {
        console.log(err)
    });
    res.status(200).json({ status: 'success', data: null, messsage: 'Logged out' });
    // res.redirect("/")
}