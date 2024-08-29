import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Room from "../../rooms/models/room.model";
import Hotel from "../../hotels/models/hotel.model";
import { User } from "../../auth/models/user.model";

class Review extends Model<InferAttributes<Review>,InferCreationAttributes<Review>>{
   declare id:CreationOptional<number>;
   declare title:string;
   declare content:string;
   declare rating:number;
   declare status:string;
   declare RoomId: ForeignKey<number>;
   declare UserId: ForeignKey<number>;
   declare updatedAt: CreationOptional<Date>
   declare createdAt: CreationOptional<Date>
}
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
    },
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
}, {sequelize, tableName:"Reviews"});

Review.belongsTo(Room);
Review.belongsTo(User);

export default Review;


