import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";


class Wallet extends Model { }
// define model
Wallet.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    type: {   // cryptocurency, fiat currency
        type: DataTypes.STRING
    },

    balance: {
        type: DataTypes.INTEGER
    }


}, { sequelize, tableName: "Transactions" });

Wallet.belongsTo(User);

export default Wallet;

