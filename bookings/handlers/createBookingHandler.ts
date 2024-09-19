import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";
import BookingType from "../types/types";
import Room from "../../rooms/models/room.model";
import { RoomType } from "../../rooms/types/types";
import { RoomService } from "../../rooms/controllers/room.controller";
import Guest from "../../guests/models/guest.model";
import { GuestType } from "../../guests/types/types";
import Transaction from "../../transactions/models/transaction.model";
import { TransactionType } from "../../transactions/types/types";
import Loyalty from "../../loyalty/models/loyalty.model";
import { v4 as uuidv4 } from "uuid";

export async function createBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {

        const data = req.body;

        let room = await RoomService.getRoom(data.RoomId as number) as unknown as RoomType;
        // check to see the room is not available
        if (room?.availability) {

            const guest = await Guest.create({
                preferences: [...data?.preferences],
                UserId: data.UserId,
                RoomId: data.RoomId
            }) as unknown as GuestType;

            if (guest !== null) {

                const bookingService = new BookingService({
                    startDate: data.startDate,
                    endDate: data.endDate,
                    status: "completed",
                    RoomId: data.RoomId,
                    UserId: data.UserId
                });

                const booking = await bookingService.createBooking() as unknown as BookingType;

                if (booking !== null) {

                    const transaction = await Transaction.create({
                        amount: data.amount,
                        type: data.type,
                        description: data.description,
                        status: data?.status ?? "pending",
                        category: data.category,
                        ref: data.ref ?? uuidv4(),
                        RoomId: data.RoomId // data.RoomId
                    }) as TransactionType;

                    if (transaction !== null) {

                        const [affectedCount] = await Room.update({
                            availability: false
                        }, { where: { id: data.RoomId } }) as [affectedCount: number];

                        room = await RoomService.getRoom(data.RoomId as number) as unknown as RoomType;

                        if (affectedCount && room?.availability === false) {

                            const loyalty = await Loyalty.create({
                                points: data?.points ?? 1,
                                tier: data?.tier ?? "bronze",
                                TransactionId: transaction.id as number,
                                UserId: data.UserId,
                            })

                            if (loyalty !== null) {
                                res.status(200).json({ status: "success", data: { guest, booking, room, transaction, loyalty }, message: "Room booked successfully" })
                            } else {
                                res.status(200).json({ status: "success", data: null, message: "No loyalty created" })
                            }
                        } else {
                            res.status(200).json({ status: "success", data: null, message: "The room not available for booking now" })
                        }

                    } else {
                        res.status(200).json({ status: "success", data: null, message: "No transaction" })
                    }
                } else {
                    res.status(200).json({ status: "success", data: { booking }, message: "Booking found" })
                }

            } else {
                res.status(200).json({ status: "success", data: null, message: "No booking created" })
            }
        } else {
            res.status(200).json({ status: "success", data: null, message: "The room not available for booking now" })
        }

    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}