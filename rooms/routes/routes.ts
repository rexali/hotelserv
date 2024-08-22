import express from "express";
import { getRoomHandler } from "../handlers/getRoomHandler";
import { getRoomsHandler } from "../handlers/getRoomsHandler";
import { createRoomHandler } from "../handlers/createRoomHandler";
import { removeRoomHandler } from "../handlers/removeRoomHandler";
import { isRoomAvailableHandler } from "../handlers/isRoomAvailableHandler";
import { updateRoomHandler } from "../handlers/updateRoomHandler";
import { searchRoomsHandler } from "../handlers/searchRoomsHandler";

const roomRouter = express.Router();

roomRouter.get("/:id", getRoomHandler);
roomRouter.get("/",getRoomsHandler);
roomRouter.post("/", createRoomHandler);
roomRouter.delete("/:id", removeRoomHandler);
roomRouter.get("/check",isRoomAvailableHandler);
roomRouter.patch("/:id",updateRoomHandler)
roomRouter.get("/search",searchRoomsHandler)

export default roomRouter;
