'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init({
    salutation: DataTypes.TEXT,
    name: DataTypes.TEXT,
    jobTitle: DataTypes.TEXT,
    gender: DataTypes.STRING,
    company: DataTypes.TEXT,
    email: DataTypes.TEXT,
    segment: DataTypes.STRING,
    province: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    city: DataTypes.TEXT,
    address: DataTypes.TEXT,
    postCode: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};