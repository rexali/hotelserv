import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";
import Room from "../../rooms/models/room.model";
import Hotel from "../../hotels/models/hotel.model";
import Wallet from "../../wallets/models/wallet.model";

class Transcation extends Model { }
// define model
Transcation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.BIGINT
    },
    type: {
        type: DataTypes.INTEGER
    },
    status: { // pending, completed, failed
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    category: { // room, wallet, food, etc
        type: DataTypes.STRING
    }


}, { sequelize, tableName: "Transactions" });

Transcation.belongsTo(Room);
Transcation.belongsTo(Wallet);

export default Transcation;

