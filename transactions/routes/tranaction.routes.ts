import express from "express";

import { getTransactionHandler } from "../handlers/getTransactionHandler";
import { createTransactionHandler } from "../handlers/createTransactionHandler";
import { updateTransactionHandler } from "../handlers/updateTransactionHandler";
import { getTransactionsHandler } from "../handlers/getTransactionsHandler";
import { getUserTransactionsHandler } from "../handlers/getUserTransactionsHandler";

const transactionRouter = express.Router();

transactionRouter.get("/", getTransactionsHandler);
transactionRouter.get("/:id/users/:userId", getUserTransactionsHandler);
transactionRouter.post("/", createTransactionHandler);
transactionRouter.patch("/:id", updateTransactionHandler);
transactionRouter.get("/:id", getTransactionHandler);

export default transactionRouter;