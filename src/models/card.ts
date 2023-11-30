// Importa las clases necesarias de las bibliotecas Sequelize y aws-sdk
import { integer } from 'aws-sdk/clients/cloudfront';
import { Model, DataTypes } from 'sequelize';

// Define una interfaz que describe la estructura de los atributos de una tarjeta
interface CardAttributes {
    ID_tarjeta: number;
    Nombre: string;
    NumeroTarjeta: number;
    Expiracion: string;
    CVV: number;
    ID_usuario: integer;
}

// Exporta una función que toma un objeto Sequelize y define el modelo de tarjeta
module.exports = (sequelize: any) => {
    // Define la clase del modelo de tarjeta que extiende la clase Model de Sequelize
    class Card extends Model<CardAttributes> implements CardAttributes {
        // Define las propiedades del modelo que coinciden con la interfaz CardAttributes
        ID_tarjeta!: number;
        Nombre!: string;
        NumeroTarjeta!: number;
        Expiracion!: string;
        CVV!: number;
        ID_usuario!: integer;

        // Define una asociación con el modelo User, si está disponible en el objeto models
        static associate(models: any) {
            if (models.User && models.User instanceof Model) {
                Card.belongsTo(models.User, { foreignKey: 'ID_usuario' });
            }
        }
    }

    // Inicializa el modelo de tarjeta con sus atributos y configuración
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

    // Devuelve el modelo de tarjeta para su uso en otras partes de la aplicación
    return Card;
};
