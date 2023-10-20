const express = require("express");
const routers = express.Router();
const { brandController } = require("../controllers");
const { auth } = require("../helpers/auth");
const { uploadBrand } = require("../lib/multer");
const {
  getAllBrand,
  getBrandDetail,
  createBrand,
  updateBrand,
  deleteBrand,
  deleteBrandForce,
  getParanoidBrand,
  restoreBrand,
  uploadBrandImage,
} = brandController;

routers.get("/", auth, getAllBrand);
routers.get("/:brandName", auth, getBrandDetail);
routers.post("/", auth, createBrand);
routers.patch("/:id", auth, updateBrand);
routers.delete("/:id", auth, deleteBrand);
routers.delete("/:id/force", auth, deleteBrandForce);
routers.get("/deleted/all", auth, getParanoidBrand);
routers.post("/restore/:id", auth, restoreBrand);
routers.post("/upload", auth, uploadBrand.single("image"), uploadBrandImage);

module.exports = routers;
