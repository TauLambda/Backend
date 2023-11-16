import { integer } from 'aws-sdk/clients/cloudfront';
import { Model, DataTypes } from 'sequelize';

interface CardAttributes {
    ID_tarjeta: number;
    Nombre: string;
    NumeroTarjeta: number;
    Expiracion: string;
    CVV: number;
    ID_usuario: integer;
}

module.exports = (sequelize: any) => {
    class Card extends Model<CardAttributes> implements CardAttributes {
        ID_tarjeta!: number;
        Nombre!: string;
        NumeroTarjeta!: number;
        Expiracion!: string;
        CVV!: number;
        ID_usuario!: integer;

        static associate(models: any) {
            if (models.User && models.User instanceof Model) {
                Card.belongsTo(models.User, { foreignKey: 'ID_usuario' });
        }
        }
    }

    Card.init(
        {
            ID_tarjeta: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            NumeroTarjeta: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Expiracion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            CVV: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ID_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'tarjeta',
        },
    );

    return Card;
};
