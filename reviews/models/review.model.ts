import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";
import Hotel from "../../hotels/models/hotel.model";
import { User } from "../../auth/models/user.model";

class Review extends Model{}
// define model
Review.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type: DataTypes.STRING
    },
    content:{
        type: DataTypes.STRING
    },
    rating:{
        type: DataTypes.INTEGER
    },
    status:{ // approved, not approved
        type: DataTypes.STRING    
    }
    

}, {sequelize, tableName:"Reviews"});

Review.belongsTo(Room);
Review.belongsTo(Hotel);
Review.belongsTo(User);


export default Review;


