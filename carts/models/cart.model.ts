import { 
    CreationOptional, 
    DataTypes, 
    ForeignKey, 
    InferAttributes, 
    InferCreationAttributes, 
    Model 
} from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";
import Room from "../../rooms/models/room.model";

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
    declare id: CreationOptional<number>;
    declare quantity: number;
    declare price: number;
    declare subtotal: number;
    declare RoomId: ForeignKey<number>;
    declare UserId: ForeignKey<number>;
}
// define model
Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.BIGINT
    },
    subtotal: {
        type: DataTypes.BIGINT
    }

}, { sequelize, tableName: "Carts" });

Cart.belongsTo(User);
Cart.belongsTo(Room);

export default Cart;

