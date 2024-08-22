import dotenv from "dotenv";
import { Sequelize, } from "sequelize";
dotenv.config();
const database = process.env.DB_NAME as string;
const username = process.env.DB_USER as string;
const password = process.env.DB_PASS as string;
const dialect = 'postgres';
const host = process.env.DB_HOST as string;

export const sequelize = new Sequelize(database, username, password, { host: host, dialect: dialect });



