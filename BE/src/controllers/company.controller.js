const companyRepositories = require("../repositories/company.repositories");

const getAllCompany = async (req, res) => {
  try {
    const resGetCompany = await companyRepositories.getCompanies();
    return res.status(200).send({ message: "kambing", data: resGetCompany });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getCompanyDetail = async (req, res) => {
  try {
    const resGetCompany = await companyRepositories.getCompany(
      req.params.companyName
    );
    return res
      .status(200)
      .send({ message: "Success get company detail", data: resGetCompany });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const createCompany = async (req, res) => {
  try {
    if (+req.user.role === 3) throw { message: "Unauthorize", statusCode: 401 };
    // get company by name
    const getCompanyByName = await companyRepositories.getCompany(
      req.body.companyName
    );
    if (getCompanyByName) {
      throw { message: "Company name already exist", statusCode: 400 };
    }
    const creator = req.user.id;
    const newCompany = await companyRepositories.createCompany({
      ...req.body,
      creator,
    });

    if (!newCompany)
      throw { message: "Create Company Failed", statusCode: 500 };
    return res.status(201).send({ message: "Successfully Create New Company" });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    if (+req.user.role === 3) throw { message: "Unauthorize", statusCode: 401 };

    const getCompanyById = await companyRepositories.getCompany(req.params.id);

    if (+req.user.role !== 1 && +req.user.id !== getCompanyById.creator) {
      throw { message: "Unauthorize", statusCode: 401 };
    }

    const updateCompany = await companyRepositories.updateCompany(
      req.body,
      req.params.id
    );

    if (typeof updateCompany === "string") {
      throw { message: "Company Name is Already Exist", statusCode: 400 };
    }

    if (!updateCompany[0]) {
      throw { message: "Failed to Update Company Data", statusCode: 400 };
    }
    return res
      .status(200)
      .send({ message: "Success Update Company Data", statusCode: 200 });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    if (+req.user.role !== 1) throw { message: "Unauthorize", statusCode: 401 };

    const { id } = req.params;
    const resDeleteCompany = await companyRepositories.deleteCompany(id);
    if (!resDeleteCompany) {
      throw { message: "Failed to Delete Company Data", statusCode: 400 };
    }

    return res
      .status(200)
      .send({ message: "Success Delete Company Data", statusCode: 200 });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const deleteCompanyForce = async (req, res) => {
  try {
    if (+req.user.role !== 1) throw { message: "Unauthorize", statusCode: 401 };

    const { id } = req.params;
    const resDeleteCompany = await companyRepositories.deleteCompany(id, true);
    if (resDeleteCompany) {
      throw { message: "Failed to Delete Company Data", statusCode: 400 };
    }
    return res
      .status(200)
      .send({ message: "Success Delete Company Data", statusCode: 200 });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const getParanoidCompany = async (req, res) => {
  try {
    const resGetCompany = await companyRepositories.getParanoidCompanies();
    return res.status(200).send({ message: "kambing", data: resGetCompany });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const restoreCompany = async (req, res) => {
  try {
    if (+req.user.role !== 1) throw { message: "Unauthorize", statusCode: 401 };

    const resRestoreCompany = await companyRepositories.restoreCompany(
      req.params.id
    );

    if (!resRestoreCompany) {
      throw { message: "Failed to Restore Company Data", statusCode: 400 };
    }
    return res
      .status(200)
      .send({ message: "Success Restore Company Data", statusCode: 200 });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

module.exports = {
  getAllCompany,
  getCompanyDetail,
  createCompany,
  updateCompany,
  deleteCompany,
  deleteCompanyForce,
  getParanoidCompany,
  restoreCompany,
};
