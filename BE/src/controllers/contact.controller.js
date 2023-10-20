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

const updateContact = async (req, res) => {
  try {
    if (+req.user.role === 3) throw { message: 'Unauthorize', statusCode: 401 };

    const getContactById = await contactRepositories.getContactById(
      req.params.id,
    );

    // if (+req.user.role !== 1 && +req.user.id !== getContactById.creator) {
    //   throw { message: "Unauthorize", statusCode: 401 };
    // }

    const resUpdate = await contactRepositories.updateContact(
      req.body,

      req.params.id,
    );
    console.log(req.body);

    if (typeof resUpdate === 'string') {
      throw { message: 'Contact Name is Already Exist', statusCode: 400 };
    }

    if (!resUpdate[0]) {
      throw { message: 'Failed to Update Contact Data', statusCode: 400 };
    }
    return res
      .status(200)
      .send({ message: 'Success Update Contact Data', statusCode: 200 });
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
  updateContact,
};
