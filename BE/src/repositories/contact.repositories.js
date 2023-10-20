const { Contact } = require('../../models');
const { Op } = require('sequelize');

class ContactRepository {
  async createContact({ ...userData }) {
    try {
      const resCreateUser = await Contact.create({
        ...userData,
      });
      return await resCreateUser;
    } catch (error) {
      throw error;
    }
  }
  async getContactById(id) {
    try {
      return await Contact.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
  async getContact(ContactData) {
    try {
      return await Contact.findOne({
        where: { [Op.or]: [{ name: ContactData }, { email: ContactData }] },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllContacts() {
    try {
      return await Contact.findAll();
    } catch (error) {
      throw error;
    }
  }
  async updateContact(data, id) {
    try {
      const res = await Contact.update({ ...data }, { where: { id } });
      return await res;
    } catch (error) {
      return error.errors[0].message;
    }
  }
  // Add other CRUD operations as needed
}

module.exports = new ContactRepository();
