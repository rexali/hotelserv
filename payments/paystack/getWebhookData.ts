// import crypto from 'crypto';
const dotenv = require('dotenv');
import { Request, Response } from "express";

dotenv.config();
// get paystack payment response
export const getWebhookData = async (req: Request, res: Response) => {
    try {
        const { createHmac } = await import('node:crypto');
        const secret = process.env.SECRET_KEY;
        // check to make sure the ip is from paystack
        if (["52.31.139.75", "52.49.173.169", "52.214.14.220"].includes(req.ip as string)) {
            const hash = createHmac('sha512', secret as string).update(JSON.stringify(req.body)).digest('hex');
            if (hash == req.headers['x-paystack-signature']) {
                const eventData = req.body;
                // do something with the response like entering the return data to database
                console.log(eventData);
                res.status(200).json(eventData);
            }
        }
    } catch (error) {
        console.warn(error);
    }
}