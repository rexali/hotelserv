import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";
import Booking from "../../bookings/models/booking.model";

class Guest extends Model{}
// define model
Guest.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    preferences:{
        type: DataTypes.ARRAY(DataTypes.STRING)
    }

}, {sequelize, tableName:"Guests"});

Guest.hasMany(Room);
Room.belongsTo(Guest);

Guest.hasMany(Booking);
Booking.belongsTo(Guest)

export default Guest

