import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model
} from "sequelize";
import { sequelize } from "../../config/sequelize.config";

class Booking extends Model<InferAttributes<Booking>, InferCreationAttributes<Booking>> {
    declare id: CreationOptional<number>;
    declare startDate: Date;
    declare endDate: Date;
    declare status: string; 
    declare RoomId: ForeignKey<number>;
    declare UserId: ForeignKey<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>

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
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, { sequelize, tableName: "Bookings" });



export default Booking;

