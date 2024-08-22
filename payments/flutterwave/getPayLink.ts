import axios from "axios";
import dotenv from 'dotenv';
import { Request, Response } from "express";
dotenv.config();

export async function getPayLink(req: Request, res: Response) {
    const {
        tx_ref,
        amount,
        email,
        currency,
        redirect_url,
        name,
        phonenumber,
    } = req.body;
    try {
        const response = await axios.post(
            'https://api.flutterwave.com/v3/payments',
            {
                tx_ref: tx_ref, //'UNIQUE_TRANSACTION_REFERENCE',
                amount: amount, //'7500',
                currency: currency, //'NGN',
                redirect_url: redirect_url, // 'https://example_company.com/success',
                customer: {
                    email: email, //'developers@flutterwavego.com',
                    name: name, //'Flutterwave Developers',
                    phonenumber: phonenumber //'09012345678'
                },
                customizations: {
                    title: 'Flutterwave Standard Payment'
                },
                configurations: {
                    session_duration: 10,// Session timeout in minutes (maxValue: 1440)    
                    max_retry_attempt: 5// Max retry (int)
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        res.status(200).json(response.data)
    } catch (err: any) {
        console.error(err.code);
        console.error(err.response.data);
    }

}