const { Company, Account } = require("../../models");
const { Op, Sequelize } = require("sequelize");

class CompanyRepository {
  async getCompanies({ search, limit, offset, orderBy, order }) {
    try {
      const { count, rows } = await Company.findAndCountAll({
        order: Sequelize.literal(`${orderBy} ${order}`),
        where: { ...search },
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
        ],
        offset,
        limit
      });

      return { count, rows };
    } catch (error) {
      throw error.errors[0].message;
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
      throw error.errors[0].message;
    }
  }

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

  async deleteCompany(id, force) {
    try {
      const resCreateCompany = await Company.destroy({
        where: { id },
        force: force ? true : false
      });
      return await resCreateCompany;
    } catch (error) {
      throw error.errors[0].message;
    }
  }

  async getParanoidCompanies() {
    try {
      return await Company.findAll({
        where: {
          deletedAt: {
            [Op.ne]: null
          }
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
        ],
        paranoid: false
      });
    } catch (error) {
      throw error.errors[0].message;
    }
  }

  async restoreCompany(id) {
    try {
      return await Company.restore({
        where: { id }
      });
    } catch (error) {
      throw error.errors[0].message;
    }
  }
}

module.exports = new CompanyRepository();
