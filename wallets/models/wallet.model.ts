import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import User from "../../auth/models/user.model";


class Wallet extends Model<InferAttributes<Wallet>, InferCreationAttributes<Wallet>> {
    declare id: CreationOptional<number>;
    declare currencyType: string;
    declare balance: number;
    declare WalletId: ForeignKey<number>
    declare UserId: ForeignKey<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

}
// define model
Wallet.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    currencyType: {   // cryptocurency, fiat currency
        type: DataTypes.STRING
    },
    balance: {
        type: DataTypes.INTEGER
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE


}, { sequelize, tableName: "Wallets" });

Wallet.belongsTo(User);

export default Wallet;


