import express from "express";

import { createHotelHandler } from "../handlers/createHotelHandler";
import { getHotelsHandler } from "../handlers/getHotelsHandler";
import { updateHotelHandler } from "../handlers/updateHotelHandler";
import { getHotelHandler } from "../handlers/getHotelHandler";
import { getHotelRoomsHandler } from "../handlers/getHotelRoomsHandler";
import { searchHotelRoomsBookingHandler } from "../handlers/searchHotelRoomsBooksHandler";
import { removeHotelHandler } from "../handlers/removeHotelHandler";

const hotelRouter = express.Router();

hotelRouter.post("/", createHotelHandler);
hotelRouter.get("/", getHotelsHandler);
hotelRouter.get("/:id", getHotelHandler);
hotelRouter.patch("/:id", updateHotelHandler);
hotelRouter.delete("/:id", removeHotelHandler);
hotelRouter.get("/:id/rooms", getHotelRoomsHandler);
hotelRouter.get("/search", searchHotelRoomsBookingHandler);

export default hotelRouter;