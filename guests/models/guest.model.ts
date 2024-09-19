import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Booking from "../../bookings/models/booking.model";

class Guest extends Model<InferAttributes<Guest>, InferCreationAttributes<Guest>> {
    declare id: CreationOptional<number>;
    declare preferences: string[];
    declare UserId:ForeignKey<number>;
    declare RoomId:ForeignKey<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
// define model
Guest.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    preferences: { // special requests e.g., wifi, extra pillows, etc
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
},
    { sequelize, tableName: "Guests" }
);

Guest.hasMany(Booking);
Booking.belongsTo(Guest);

export default Guest

