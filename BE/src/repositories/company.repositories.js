const { Company, Account } = require("../../models");
const { Op } = require("sequelize");

class CompanyRepository {
  async getCompanies() {
    try {
      return await Company.findAll({
        include: [
          {
            model: Account,
            as: "creators",
            attributes: ["fullname", "username"]
          },
          {
            model: Account,
            as: "salesPICs",
            attributes: ["fullname", "username"]
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  async getCompany(data) {
    try {
      return await Company.findOne({
        where: {
          [Op.or]: [{ id: data }, { companyName: data }]
        },
        include: [
          {
            model: Account,
            as: "creators",
            attributes: ["fullname", "username"]
          },
          {
            model: Account,
            as: "salesPICs",
            attributes: ["fullname", "username"]
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  // async getCompanyByName(data) {
  //   try {
  //     return await Company.findOne({
  //       where: { companyName: data },
  //       include: [
  //         {
  //           model: Account,
  //           as: "creators",
  //           attributes: ["fullname", "username"]
  //         },
  //         {
  //           model: Account,
  //           as: "salesPICs",
  //           attributes: ["fullname", "username"]
  //         }
  //       ]
  //     });
  //   } catch (error) {}
  // }

  async createCompany(companyData) {
    try {
      const resCreateCompany = await Company.create(companyData);
      return await resCreateCompany;
    } catch (error) {
      throw error.errors[0].message;
    }
  }

  async updateCompany(data, id) {
    try {
      const resUpdateCompany = await Company.update(
        { ...data },
        { where: { id } }
      );
      return await resUpdateCompany;
    } catch (error) {
      return error.errors[0].message;
    }
  }
}

module.exports = new CompanyRepository();
