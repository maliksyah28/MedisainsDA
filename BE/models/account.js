"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasMany(models.Company, { foreignKey: "id" });
    }
  }
  Account.init(
    {
      fullname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      token: {
        type: DataTypes.TEXT,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
    }
  );
  return Account;
};
