import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";

class Notification extends Model{}
// define model
Notification.init({
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
    status:{
        type: DataTypes.STRING
    },
    type:{
        type: DataTypes.STRING    
    },
    triggers:{
        type: DataTypes.ARRAY(DataTypes.STRING)    
    },
    channels:{
        type: DataTypes.ARRAY(DataTypes.STRING)   
    }
    ,
    recipients:{
        type: DataTypes.ARRAY(DataTypes.STRING)    
    },
    timing:{
        type: DataTypes.STRING    
    }
    ,
    actions:{
        type: DataTypes.ARRAY(DataTypes.STRING)    
    }
    

}, {sequelize, tableName:"Notifications"});


export default Notification

