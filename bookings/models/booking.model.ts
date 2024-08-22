import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";

class Booking extends Model { }
// define model
Booking.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    },

}, { sequelize, tableName: "Bookings" });

Booking.belongsTo(Room)

export default Booking

