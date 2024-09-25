import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";
import User from "../../auth/models/user.model";

class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
    declare id: CreationOptional<number>;
    declare firstName: string;
    declare lastName: string;
    declare image: string;
    declare phone: string;
    declare dateOfBirth: Date;
    declare address: string;
    declare localGovt: string;
    declare state: string;
    declare country: string;
    declare UserId: ForeignKey<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
// define model
Profile.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    dateOfBirth: {
        type: DataTypes.DATE
    },
    address: {
        type: DataTypes.STRING
    },
    localGovt: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, { sequelize, tableName: "Profiles" });

Profile.belongsTo(User);

export default Profile;

