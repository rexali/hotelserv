import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";

class Cart extends Model { }
// define model
Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomId: {
        type: DataTypes.INTEGER
    },
    quantity:{
        type: DataTypes.INTEGER  
    },
    price:{
        type: DataTypes.BIGINT    
    },
    subtotal:{
        type: DataTypes.BIGINT    
    }

}, { sequelize, tableName: "Carts" });

Cart.belongsTo(User);

export default Cart;

