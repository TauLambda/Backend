'use strict';

import { Model, DataTypes } from 'sequelize';

interface UserAttributes {
  awsCognitoId: string;
  name: string;
  role: string;
  email: string;
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  SUPERVISOR = 'SUPERVISOR',
  AGENT = 'AGENT',
  CUSTOMER = 'CUSTOMER',
}

module.exports = (sequelize: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    awsCognitoId!: string;
    name!: string;
    role!: string;
    email!: string;

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
      awsCognitoId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: UserRoles.CUSTOMER,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
