import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";

class Hotel extends Model{}
// define model
Hotel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING 
    },
    phone:{
        type: DataTypes.STRING 
    },
    address:{
        type: DataTypes.STRING 
    },
    description:{
        type: DataTypes.TEXT 
    },  
    localgovt:{
        type: DataTypes.STRING 
    },
    state:{
        type: DataTypes.STRING 
    },
    country:{
        type: DataTypes.STRING 
    }

}, {sequelize, tableName:"Hotels"});

Hotel.hasMany(Room);
Room.belongsTo(Hotel);

export default Hotel

