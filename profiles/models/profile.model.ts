import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import User from "../../auth/models/user.model";

class Profile extends Model{}
// define model
Profile.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    image:{
        type: DataTypes.STRING 
    },
    phone:{
        type: DataTypes.STRING 
    },
    dateOfBirth:{
        type: DataTypes.DATE 
    },
    address:{
        type: DataTypes.STRING 
    },
    localGovt:{
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

export default Profile;

