import express from "express";
import { homeHandler } from "./handlers/home.handler";

const homeRouter = express.Router();

homeRouter.get("/", homeHandler);

export default homeRouter;