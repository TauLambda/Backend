import { float, integer } from "aws-sdk/clients/cloudfront";
import { Model, DataTypes } from "sequelize";

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

module.exports = (sequelize: any) => {
    class History extends Model<HistoryAtributes> implements HistoryAtributes {
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

        static associate(models: any) {
            if (models.User && models.User instanceof Model) {
                History.belongsTo(models.User, { foreignKey: 'ID_usuario' })
            }
        }
    }

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

    return History;
}