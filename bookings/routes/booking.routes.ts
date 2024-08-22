import express from "express";
import { createBookingHandler } from "../handlers/createBookingHandler";
import { updateBookingHandler } from "../handlers/updateBookingHandler";
import { cancelBookingHandler } from "../handlers/cancelBookingHandler";
import { getBookingHandler } from "../handlers/getBookingHandler";
import { getBookingsHandler } from "../handlers/getBookingsHandler";

const bookingRouter = express.Router();

bookingRouter.post("/", createBookingHandler);
bookingRouter.put("/:id",updateBookingHandler);
bookingRouter.patch("/:id",cancelBookingHandler);
bookingRouter.get("/:id",getBookingHandler);
bookingRouter.get("/",getBookingsHandler);


export default bookingRouter;