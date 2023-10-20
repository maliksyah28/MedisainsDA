"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.belongsTo(models.Account, {
        as: "brandPICs",
        foreignKey: "brandPIC",
      });
    }
  }
  Brand.init(
    {
      brandName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      brandPIC: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "accounts",
          key: "id",
        },
      },
      brandImage: {
        type: DataTypes.STRING,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Brand",
      tableName: "brands",
      deletedAt: "deletedAt",
      paranoid: true,
    }
  );
  return Brand;
};
