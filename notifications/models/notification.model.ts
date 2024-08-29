import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";

class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare message: string;
    declare type: string;
    declare recipient: string
    declare status: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
// define model
Notification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    recipient: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE


}, { sequelize, tableName: "Notifications" });


export default Notification

