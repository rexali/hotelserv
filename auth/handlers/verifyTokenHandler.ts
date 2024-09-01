import jwt from "jsonwebtoken";
import { Mutex } from "async-mutex";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { ProfileService } from "../../profiles/controllers/profile.controller";
dotenv.config();

// create mutex instance
const mutex = new Mutex();

interface Decoded {
       userId: number,
       username: string,
       role: string,
       permission: string[],
}
// create mutex instance
export default async function verifyTokenHandler(req: Request, res: Response, next: NextFunction) {
       // acquire access to the path to do operation (for race condition)
       const release = await mutex.acquire(); // lock the thread
       const token = req.body.token || req.cookies.token;
       try {
              let decoded = jwt.verify(token, process.env.SECRET_KEY as string) as Decoded;
              if (decoded.userId && decoded.role) {
                     const profile = await ProfileService.getProfile(decoded.userId);
                     const photo = profile?.image;
                     return res.status(200).json({
                            status: 'success',
                            data: {
                                   token,
                                   email: decoded.username,
                                   userId: decoded.userId,
                                   role: decoded.role,
                                   photo,
                            },
                            messsage: 'Verified'

                     });
              } else {
                     res.status(404).json({ status: 'success', data: null, messsage: 'Error: Unauthorized' });
              }

       } catch (error) {
              res.status(500).json({ status: 'fail', data: null, messsage: 'Error: ' + error });
       } finally {
              // release path for other
              release(); // unlock the thread
       }

}
