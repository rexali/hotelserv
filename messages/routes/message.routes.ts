import express from "express";
import { getMessagesHandler } from "../handlers/getMessagesHandler";
import { createMessageHandler } from "../handlers/createMessageHandler";
import { removeMessageHandler } from "../handlers/removeMessageHandler";
import { updateMessageHandler } from "../handlers/updateMessageHandler";

const messageRouter = express.Router();

messageRouter.get("/", getMessagesHandler);
messageRouter.post("/", createMessageHandler);
messageRouter.delete("/:id", removeMessageHandler);
messageRouter.patch("/:id", updateMessageHandler);

export default messageRouter;