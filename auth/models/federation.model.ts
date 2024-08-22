import { DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize.config";

export const Federation = sequelize.define(
    "Federation",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        provider: {
            type: DataTypes.STRING
        },
        subject: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "Federations"
    }
)
