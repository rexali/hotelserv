import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";

class Message extends Model{}
// define model
Message.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type: DataTypes.STRING
    },
    message:{
        type: DataTypes.STRING
    },
    recipient:{
        type: DataTypes.STRING   
    }
    ,
    sender:{
        type: DataTypes.STRING    
    }
    
}, {sequelize, tableName:"Messages"});


export default Message

