import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";
import User from "../../auth/models/user.model";

class Favorite extends Model<InferAttributes<Favorite>, InferCreationAttributes<Favorite>> {
    declare id: CreationOptional<number>;
    declare RoomId: ForeignKey<number>;
    declare UserId: ForeignKey<number>;
}
// define model
Favorite.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, { sequelize, tableName: "Favorites" });

Favorite.belongsTo(User);
Favorite.belongsTo(Room);

export default Favorite;

