const contactRepositories = require('../repositories/contact.repositories');

const createContact = async (req, res) => {
  try {
    const newContact = await contactRepositories.createContact({ ...req.body });
    if (!newContact)
      throw { message: 'create Contact Failed', statusCode: 500 };
    return res.status(201).send({ message: 'success create Contact' });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const getAllContact = async (req, res) => {
  try {
    const data = await contactRepositories.getAllContacts();
    if (!data) throw { message: 'Contact Empty', statusCode: 500 };
    // console.log(allContact);
    return res.status(201).send({ message: 'contact list', data });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};
const ContactById = async (req, res) => {
  try {
    const data = await contactRepositories.getContactById(req.body.id);
    if (!data) throw { message: 'Contact Empty', statusCode: 500 };
    // console.log(allContact);
    return res.status(201).send({ message: 'contact detail', data });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

module.exports = {
  createContact,
  getAllContact,
  ContactById,
};
