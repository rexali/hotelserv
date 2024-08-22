import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";
import Room from "../../rooms/models/room.model";
import Hotel from "../../hotels/models/hotel.model";

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
    categoryId: { // room, wallet, food, etc
        type: DataTypes.INTEGER
    }


}, { sequelize, tableName: "Transactions" });

Transcation.belongsTo(User);
Transcation.belongsTo(Room);
Transcation.belongsTo(Hotel);

export default Transcation;

