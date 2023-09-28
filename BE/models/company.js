"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.belongsTo(models.Account, {
        as: "creators",
        foreignKey: "creator",
      });
      Company.belongsTo(models.Account, {
        as: "salesPICs",
        foreignKey: "salesPIC",
      });
    }
  }
  Company.init(
    {
      companyName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      creator: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "accounts",
          key: "id",
        },
      },
      salesPIC: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "id",
        },
      },
      phoneNumber: DataTypes.STRING(20),
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
    }
  );
  return Company;
};
