import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model
} from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Booking from "../../bookings/models/booking.model";

class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
    declare id?: CreationOptional<number>;
    declare photos:Array<String>;
    declare roomNumber: number;
    declare roomType: string;
    declare availability: boolean;
    declare price: number;
    declare HotelId: ForeignKey<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
// define model
Room.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomNumber: {
        type: DataTypes.INTEGER
    },
    roomType: {
        type: DataTypes.STRING
    },
    availability: {
        type: DataTypes.BOOLEAN
    },
    price: {
        type: DataTypes.INTEGER
    },
    photos:{
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  
}, { sequelize, tableName: "Rooms" });

Room.hasMany(Booking);
Booking.belongsTo(Room);


export default Room;

