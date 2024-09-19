import { 
    CreationOptional, 
    DataTypes, 
    ForeignKey, 
    InferAttributes, 
    InferCreationAttributes, 
    Model 
} from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";

class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>> {
    declare id: CreationOptional<number>;
    declare photo: string;
    declare name: string;
    declare email: string;
    declare phone: string;
    declare address: string;
    declare description: string;
    declare localGovt: string;
    declare state: string;
    declare country: string;
    declare document: string;
    declare UserId: ForeignKey<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
// define model
Hotel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    photo: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    localGovt: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    document: {
        type: DataTypes.STRING,
        allowNull:true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

}, { sequelize, tableName: "Hotels" });

Hotel.hasMany(Room);
Room.belongsTo(Hotel);


export default Hotel;

