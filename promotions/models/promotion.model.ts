import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";
import User from "../../auth/models/user.model";

class Promotion extends Model<InferAttributes<Promotion>, InferCreationAttributes<Promotion>> {
    declare id: CreationOptional<number>;
    declare RoomId: ForeignKey<number>;
    declare UserId: ForeignKey<number>;
    declare name: string;
    declare endDate: string;
    declare startDate: string;
    declare description: string;
    declare minPurchase: string;
    declare maxPurchase: string;
    declare status: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

}
// define model
Promotion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // e.g. Summer Sale
        type: DataTypes.STRING
    },
    endDate: {
        type: DataTypes.DATE
    },
    startDate: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    },
    minPurchase: {
        type: DataTypes.INTEGER
    },
    maxPurchase: {
        type: DataTypes.INTEGER
    },
    status: { // active or inactive
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

}, { sequelize, tableName: "Promotions" });

Promotion.belongsTo(User);
Promotion.belongsTo(Room);

export default Promotion;

