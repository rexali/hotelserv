import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";

class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare message: string;
    declare recipient: string;
    declare sender: string;
    declare UserId: ForeignKey<number>;
    declare updatedAt: CreationOptional<Date>
    declare createdAt: CreationOptional<Date>
}
// define model
Message.init({
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
    recipient: {
        type: DataTypes.STRING
    }
    ,
    sender: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

}, { sequelize, tableName: "Messages" });

Message.belongsTo(User);

export default Message

