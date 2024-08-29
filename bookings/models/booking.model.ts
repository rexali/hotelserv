import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";
import Guest from "../../guests/models/guest.model";

class Booking extends Model<InferAttributes<Booking>, InferCreationAttributes<Booking>> { 
    declare id:number;
    declare startDate:Date;
    declare endDate:Date;
    declare status:string;
    declare RoomId: ForeignKey<number>;
    declare GuestId: ForeignKey<number>;

}
// define model
Booking.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    }
}, { sequelize, tableName: "Bookings" });

Booking.belongsTo(Room);
Booking.belongsTo(Guest);

export default Booking;

