import axios from "axios";
import dotenv  from 'dotenv';
import { Request, Response } from "express";
dotenv.config();

export const getTransactionUrl = async (req:Request, res:Response) => {
    try {
        const { amount, email } = req.body;
        let { data } = await axios.post(`https://api.paystack.co/transaction/initialize`, {
             amount,
             email,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.PAYSTACK_SECRET,
            }
        });

        res.status(200).json(data)
    } catch (error) {
        console.warn(error);
    }
}
