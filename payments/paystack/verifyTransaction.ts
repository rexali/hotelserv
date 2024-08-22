import axios from "axios";
import dotenv from 'dotenv';
import { Request, Response } from "express";
dotenv.config();

export const verifyTransaction = async (req: Request, res: Response) => {
    // call paystack verify transaction api
    try {
        const { reference } = req.body
        const { data }: { data: any } = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                'Authorization': 'Bearer ' + process.env.PAYSTACK_SECRET
            }
        });
        console.log(data);
        res.status(200).json({ success: data.data.success })
    } catch (error) {
        console.warn(error);
    }
}