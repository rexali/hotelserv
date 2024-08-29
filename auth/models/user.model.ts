import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import { Federation } from "./federation.model";
import Hotel from "../../hotels/models/hotel.model";
import Guest from "../../guests/models/guest.model";


interface UserModel extends Model <InferAttributes<UserModel>,InferCreationAttributes<UserModel>> {

    id:CreationOptional<number>;
    username:string;
    password:string;
    permission:Array<string>;
    status:string;
    role:string;
    code:string;
}
export const User = sequelize.define<UserModel>(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: { // email
            type: DataTypes.STRING,
            unique:true
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        },
        permission: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        status: {
            type: DataTypes.ENUM("yes", "no")
        },
        code: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "Users"
    }
);

User.hasMany(Federation);
Federation.belongsTo(User);

User.hasMany(Hotel);
Hotel.belongsTo(User);

User.hasOne(Guest)
