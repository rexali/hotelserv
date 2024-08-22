import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";
import Room from "../../rooms/models/room.model";
import Hotel from "../../hotels/models/hotel.model";

class Promotion extends Model { }
// define model
Promotion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // e.g. Summer Sale
        type: DataTypes.STRING
    },
    endDate: {
        type: DataTypes.DATE
    },
    startDate: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    },
    minPurchase: {
        type: DataTypes.INTEGER
    },
    maxPurchase: {
        type: DataTypes.INTEGER
    },
    status: { // active or inactive
        type: DataTypes.STRING
    }
    
}, { sequelize, tableName: "Promotions" });

Promotion.belongsTo(User);
Promotion.belongsTo(Room);
Promotion.belongsTo(Hotel);

export default Promotion;

