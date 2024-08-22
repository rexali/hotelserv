import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";

class Room extends Model{}
// define model
Room.init({ 
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    number:{
        type: DataTypes.INTEGER
    },
    type:{
        type: DataTypes.STRING 
    },
    availabilty:{
        type: DataTypes.BOOLEAN
    },
    price:{
        type: DataTypes.INTEGER
    }

}, {sequelize, tableName:"Rooms"});

export default Room;

