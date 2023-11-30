        'use strict';

import { Integer } from 'aws-sdk/clients/apigateway';
        import { integer } from 'aws-sdk/clients/cloudfront';
        import { float } from 'aws-sdk/clients/lightsail';
        import { Model, DataTypes } from 'sequelize';

        interface UserAttributes {
                ID_usuario: integer;
                Nombre: string;
                Contrasena: string;
                Correo: string;
                Telefono: integer;
                TipoUsuario: string;
                Cashback: float;
        }

        module.exports = (sequelize: any) => {
            class User extends Model<UserAttributes> implements UserAttributes {
                    ID_usuario!: integer;
                    Nombre!: string;
                    Contrasena!: string;
                    Correo!: string;
                    Telefono!: integer;
                    TipoUsuario!: string;
                    Cashback!: float;

            static associate(models: any) {
            // Check if 'Project' model is available in 'models' and ensure it's a Sequelize model.
            if (models.Project && models.Project instanceof Model) {
                    User.belongsToMany(models.Project, {
                    through: 'ProjectUser',
                    });
            }
            }
            }

            User.init(
            {
                    ID_usuario: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                    },
                    Nombre: {
                            type: DataTypes.STRING,
                            allowNull: false
                    },
                    Contrasena: {
                            type: DataTypes.STRING,
                            allowNull: false
                    },
                    Correo: {
                            type: DataTypes.STRING,
                            allowNull: false,
                    },
                    Telefono: {
                            type: DataTypes.INTEGER,
                            allowNull: false,
                    },
                    TipoUsuario: {
                            type: DataTypes.STRING,
                            allowNull: false
                    },
                    Cashback: {
                            type: DataTypes.FLOAT,
                            allowNull: false,
                            defaultValue: 0.0
                    },
            },
            {
            sequelize,
            modelName: 'usuario',
            }
            );

        return User;
        };
