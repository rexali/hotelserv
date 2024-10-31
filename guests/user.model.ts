import { DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { Federation } from "./federation.model";
import Hotel from "../../hotels/models/hotel.model";
import Guest from "../../booking/models/guest.model";

export const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        },
        permission: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        status: {
            type: DataTypes.ENUM("yes", "no")
        },
        code: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "Users"
    }
);

User.hasMany(Federation);
Federation.belongsTo(User);

User.hasMany(Hotel);
Hotel.belongsTo(User);

User.hasOne(Guest)
