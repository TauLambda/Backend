'use strict';
import { integer } from 'aws-sdk/clients/cloudfront';
import { Model, DataTypes } from 'sequelize';

// Definición de los atributos de un carro
interface CarAttributes {
    ID_carro: integer;
    Modelo: string;
    Placa: string;
    ID_usuario: integer;
}

module.exports = (sequelize: any) => {
    class Car extends Model<CarAttributes> implements CarAttributes {
        ID_carro!: integer;
        Modelo!: string;
        Placa!: string;
        ID_usuario!: integer;

        static associate(models: any) {
            // Verificar si el modelo 'Project' está disponible en 'models' y asegurarse de que sea un modelo de Sequelize.
            if (models.Project && models.Project instanceof Model) {
                Car.belongsToMany(models.Project, {
                    through: 'ProjectUser',
                });
            }
        }
    }

    Car.init(
        {
            ID_carro: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            Placa: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Modelo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ID_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'carro',
        }
    );

    return Car;
};
