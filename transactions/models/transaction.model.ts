import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";
import Wallet from "../../wallets/models/wallet.model";

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    declare id: CreationOptional<number>;
    declare amount: number;
    declare type: string; // credit, debit, transfer etc
    declare status: string;
    declare description: string;
    declare category: string;  // wallet, room , food
    declare ref:string;
    declare LoyaltyId: ForeignKey<number> | CreationOptional<null>;
    declare WalletId: ForeignKey<number> | CreationOptional<null>;
    declare RoomId: ForeignKey<number> | CreationOptional<null>;
    declare promotionId: ForeignKey<number> | CreationOptional<null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
// define model
Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.BIGINT
    },
    type: {
        type: DataTypes.STRING
    },
    status: { // pending, completed, failed
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    category: { // room, wallet, food, etc
        type: DataTypes.STRING
    },
    ref:{
        type: DataTypes.STRING   
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, { sequelize, tableName: "Transactions" });

Transaction.belongsTo(Room);
Transaction.belongsTo(Wallet);

export default Transaction;

