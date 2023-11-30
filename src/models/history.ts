// Importa las clases necesarias de las bibliotecas Sequelize y aws-sdk
import { float, integer } from "aws-sdk/clients/cloudfront";
import { Model, DataTypes } from "sequelize";

// Define una interfaz que describe la estructura de los atributos de un historial
interface HistoryAtributes {
    ID_historial: integer;
    Carga: float;
    Monto: float;
    TipoGas: string;
    MetodoPago: string;
    FechaTransaccion: Date;
    Estatus: string;
    ID_carro: integer;
    ID_usuario: integer;
    Bomba: integer;
    ID_estacion: integer;
}

// Exporta una función que toma un objeto Sequelize y define el modelo de historial
module.exports = (sequelize: any) => {
    // Define la clase del modelo de historial que extiende la clase Model de Sequelize
    class History extends Model<HistoryAtributes> implements HistoryAtributes {
        // Define las propiedades del modelo que coinciden con la interfaz HistoryAtributes
        ID_historial!: integer;
        Carga!: float;
        Monto!: float;
        TipoGas!: string;
        MetodoPago!: string;
        FechaTransaccion!: Date;
        Estatus!: string;
        ID_carro!: integer;
        ID_usuario!: integer;
        Bomba!: integer;
        ID_estacion!: integer;

        // Define una asociación con el modelo User, si está disponible en el objeto models
        static associate(models: any) {
            if (models.User && models.User instanceof Model) {
                History.belongsTo(models.User, { foreignKey: 'ID_usuario' });
            }
        }
    }

    // Inicializa el modelo de historial con sus atributos y configuración
    History.init(
        {
            ID_historial: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Carga: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            Monto: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            TipoGas: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            MetodoPago: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            FechaTransaccion: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            Estatus: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ID_carro: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ID_usuario:  {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Bomba:  {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ID_estacion:  {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'historial',
        },
    );

    // Devuelve el modelo de historial para su uso en otras partes de la aplicación
    return History;
};
