import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";


class Loyalty extends Model<InferAttributes<Loyalty>, InferCreationAttributes<Loyalty>> {
    declare id: CreationOptional<number>;
    declare points: number;
    declare tier: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare UserId: ForeignKey<number>;
    declare TransactionId: ForeignKey<number>;
}

// define model
Loyalty.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    points: {
        type: DataTypes.INTEGER
    },
    tier: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

}, { sequelize, tableName: "loyalties" });

// associate and configure UserId as foreign key
Loyalty.belongsTo(User);

export default Loyalty;

