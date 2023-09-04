const { Account } = require("../../models");
const { Op } = require("sequelize");
const { compare, hash } = require("../lib/bcrypt");

class UserRepository {
  async createUser({ password, ...userData }) {
    try {
      const encryptedPassword = hash(password);
      const resCreateUser = await Account.create({
        ...userData,
        password: encryptedPassword,
      });
      return await resCreateUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await Account.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async getUser(userData) {
    try {
      console.log(userData);
      return await Account.findOne({
        where: { [Op.or]: [{ username: userData }, { email: userData }] },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw error;
    }
  }

  // Add other CRUD operations as needed
}

module.exports = new UserRepository();
