import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.config";


interface FederationModel extends Model <InferAttributes<FederationModel>,InferCreationAttributes<FederationModel>> {

    id:CreationOptional<number>,
    provider:string,
    subject:string
}

export const Federation = sequelize.define<FederationModel>(
    "Federation",
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
        tableName: "Federations"
    }
)
