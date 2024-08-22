import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";

class Favorite extends Model { }
// define model
Favorite.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomId: {
        type: DataTypes.INTEGER
    },
    HotelId: {
        type: DataTypes.INTEGER
    },

}, { sequelize, tableName: "Favorites" });

Favorite.belongsTo(User);

export default Favorite;

