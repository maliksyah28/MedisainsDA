const { Op } = require("sequelize");
const brandRepositories = require("../repositories/brand.repositories");
const sharp = require("sharp");

const getAllBrand = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      order = "DESC",
      orderBy = "createdAt",
      brandName,
    } = req.query;
    let search = {};
    if (brandName) {
      search = { brandName: { [Op.substring]: brandName } };
    }
    const limit = Number(pageSize);
    const offset = (Number(page) - 1) * Number(pageSize);

    const { count, rows } = await brandRepositories.getBrands({
      search,
      limit,
      offset,
      order,
      orderBy,
    });
    return res.status(200).send({
      message: "Success get all brands",
      data: rows,
      totalPages: count,
    });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getBrandDetail = async (req, res) => {
  try {
    const resGetBrand = await brandRepositories.getBrand(req.params.brandName);
    return res
      .status(200)
      .send({ message: "Success get brand detail", data: resGetBrand });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const createBrand = async (req, res) => {
  try {
    if (+req.user.role === 3) throw { message: "Unauthorize", statusCode: 401 };
    // get Brand by name
    const getBrandByName = await brandRepositories.getBrand(req.body.brandName);
    if (getBrandByName) {
      throw { message: "Brand name already exist", statusCode: 400 };
    }

    const newBrand = await brandRepositories.createBrand({
      ...req.body,
    });

    if (!newBrand) throw { message: "Create Brand Failed", statusCode: 500 };
    return res.status(201).send({ message: "Successfully Create New Brand" });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    if (+req.user.role === 3) throw { message: "Unauthorize", statusCode: 401 };

    const updateBrand = await brandRepositories.updateBrand(
      req.body,
      req.params.id
    );

    if (typeof updateBrand === "string") {
      throw { message: "Brand Name is Already Exist", statusCode: 400 };
    }

    if (!updateBrand[0]) {
      throw { message: "Failed to Update Brand Data", statusCode: 400 };
    }
    return res
      .status(200)
      .send({ message: "Success Update Brand Data", statusCode: 200 });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    if (+req.user.role !== 1) throw { message: "Unauthorize", statusCode: 401 };

    const { id } = req.params;
    const resDeleteBrand = await brandRepositories.deleteBrand(id);
    if (!resDeleteBrand) {
      throw { message: "Failed to Delete Brand Data", statusCode: 400 };
    }

    return res
      .status(200)
      .send({ message: "Success Delete Brand Data", statusCode: 200 });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const deleteBrandForce = async (req, res) => {
  try {
    if (+req.user.role !== 1) throw { message: "Unauthorize", statusCode: 401 };

    const { id } = req.params;
    const resDeleteBrand = await brandRepositories.deleteBrand(id, true);
    if (resDeleteBrand) {
      throw { message: "Failed to Delete Brand Data", statusCode: 400 };
    }
    return res
      .status(200)
      .send({ message: "Success Delete Brand Data", statusCode: 200 });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const getParanoidBrand = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Number(pageSize);
    const offset = (Number(page) - 1) * Number(pageSize);

    const { rows, count } = await brandRepositories.getParanoidBrands({
      limit,
      offset,
    });
    return res
      .status(200)
      .send({ message: "Success get brands", data: rows, totalPages: count });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const restoreBrand = async (req, res) => {
  try {
    if (+req.user.role !== 1) throw { message: "Unauthorize", statusCode: 401 };

    const resRestoreBrand = await brandRepositories.restoreBrand(req.params.id);

    if (!resRestoreBrand) {
      throw { message: "Failed to Restore Brand Data", statusCode: 400 };
    }
    return res
      .status(200)
      .send({ message: "Success Restore Brand Data", statusCode: 200 });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode,
    });
  }
};

const uploadBrandImage = async (req, res) => {
  try {
    if (!req.file) {
      throw { message: "Failed to Upload Brand Image", statusCode: 400 };
    }

    // const { buffer, originalname } = req.file;
    // const ref = `${originalname.split(".")[0]}.webp`;
    // await sharp(buffer)
    //   .webp({ quality: 20 })
    //   .toFile("./public/brand/" + ref);

    return res
      .status(200)
      .send({ message: "Success Upload Brand Image", statusCode: 200 });
  } catch (error) {
    return res.status(error.statusCode || 500).send({
      message: error.message || error,
      statusCode: error.statusCode || 500,
    });
  }
};

module.exports = {
  getAllBrand,
  getBrandDetail,
  createBrand,
  updateBrand,
  deleteBrand,
  deleteBrandForce,
  getParanoidBrand,
  restoreBrand,
  uploadBrandImage,
};
