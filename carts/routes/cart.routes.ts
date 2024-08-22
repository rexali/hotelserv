import express from "express";
import { getCartsHandler } from "../handlers/getCartsHandler";
import { removeCartHandler } from "../handlers/removeCartHandler";
import { createCartHandler } from "../handlers/createCartHandler";
import { clearCartHandler } from "../handlers/clearCartHandler";

const cartRouter = express.Router();

cartRouter.post("/", createCartHandler);
cartRouter.delete("/:roomId/:userId", removeCartHandler);
cartRouter.get("/:userId", getCartsHandler);
cartRouter.get("/:userId", clearCartHandler);

export default cartRouter;