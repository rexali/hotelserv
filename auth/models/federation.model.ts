import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";

class Federation extends Model <InferAttributes<Federation>,InferCreationAttributes<Federation>> {

    declare id:CreationOptional<number>;
    declare provider:string;
    declare subject:string;
}
Federation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        provider: {
            type: DataTypes.STRING
        },
        subject: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        tableName: "Federations"
    }
)

export default Federation;