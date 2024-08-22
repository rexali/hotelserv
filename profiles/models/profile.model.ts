import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { User } from "../../auth/models/user.model";

class Profile extends Model{}
// define model
Profile.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING
    },
    image:{
        type: DataTypes.STRING 
    },
    phone:{
        type: DataTypes.STRING 
    },
    address:{
        type: DataTypes.STRING 
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

}, {sequelize, tableName:"Profiles"});

Profile.belongsTo(User);

export default Profile

