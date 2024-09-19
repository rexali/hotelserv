import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import Hotel from "../../hotels/models/hotel.model";
import Guest from "../../guests/models/guest.model";
import Federation from "./federation.model";


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    declare id: CreationOptional<number>;
    declare username: string;
    declare password: string;
    declare permission: Array<string>;
    declare status: string;
    declare role: string;
    declare code: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: { // email
        type: DataTypes.STRING,
        unique: true
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
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
},
    {
        sequelize,
        tableName: "Users"
    }
    
);

User.hasMany(Federation);
Federation.belongsTo(User);

User.hasMany(Hotel);

User.hasOne(Guest);
Guest.belongsTo(User);

Hotel.belongsTo(User);

export default User;