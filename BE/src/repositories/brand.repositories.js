const { Brand, Account } = require("../../models");
const { Op, Sequelize } = require("sequelize");

class BrandRepository {
  async getBrands({ search, limit, offset, orderBy, order }) {
    try {
      const { count, rows } = await Brand.findAndCountAll({
        order: Sequelize.literal(`${orderBy} ${order}`),
        where: { ...search },
        include: [
          {
            model: Account,
            as: "brandPICs",
            attributes: ["fullname", "username"],
          },
        ],
        offset,
        limit,
      });

      return { count, rows };
    } catch (error) {
      throw error.errors[0].message;
    }
  }

  async getBrand(data) {
    try {
      return await Brand.findOne({
        where: {
          [Op.or]: [{ id: data }, { brandName: data }],
        },
        include: [
          {
            model: Account,
            as: "brandPICs",
            attributes: ["fullname", "username"],
          },
        ],
      });
    } catch (error) {
      throw error.errors[0].message;
    }
  }

  async createBrand(brandData) {
    try {
      const resCreateBrand = await Brand.create(brandData);
      return await resCreateBrand;
    } catch (error) {
      throw error.errors[0].message;
    }
  }

  async updateBrand(data, id) {
    try {
      const resUpdateBrand = await Brand.update({ ...data }, { where: { id } });
      return await resUpdateBrand;
    } catch (error) {
      return error.errors[0].message;
    }
  }

  async deleteBrand(id, force) {
    try {
      const resCreateBrand = await Brand.destroy({
        where: { id },
        force: force ? true : false,
      });
      return await resCreateBrand;
    } catch (error) {
      throw error.errors[0].message;
    }
  }

  async getParanoidBrands({ limit, offset }) {
    try {
      const { count, rows } = await Brand.findAndCountAll({
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
        },
        include: [
          {
            model: Account,
            as: "brandPICs",
            attributes: ["fullname", "username"],
          },
        ],
        paranoid: false,
        offset,
        limit,
      });

      return { count, rows };
    } catch (error) {
      throw error.errors[0].message;
    }
  }

  async restoreBrand(id) {
    try {
      return await Brand.restore({
        where: { id },
      });
    } catch (error) {
      throw error.errors[0].message;
    }
  }
}

module.exports = new BrandRepository();
