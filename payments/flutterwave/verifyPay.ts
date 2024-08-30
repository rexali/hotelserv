import { Request, Response } from "express";
const Flutterwave = require('flutterwave-node-v3');
import Booking from "../../bookings/models/booking.model";

export const verifyPay = async (req: Request, res: Response) => {
    // const Flutterwave = await import("flutterwave-node-v3");
    if (req.query.status === 'successful') {
        const transactionDetails = await Booking.findOne({ where: {ref: req.query.tx_ref as string } }) as any;
        const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
        const response = await flw.Transaction.verify({ id: req.query.transaction_id });
        if (
            response.data.status === "successful" && 
            response.data.amount === transactionDetails.amount &&  // expected amount from db
            response.data.currency === "NGN" // expected currency
        ) {
            // Success! Confirm the customer's payment
        } else {
            // Inform the customer their payment was unsuccessful
        }
    }
};