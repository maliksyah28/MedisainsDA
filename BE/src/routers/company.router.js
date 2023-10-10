const express = require("express");
const routers = express.Router();
const { companyController } = require("../controllers");
const { auth } = require("../helpers/auth");
const {
  getAllCompany,
  getCompanyDetail,
  createCompany,
  updateCompany,
  deleteCompany,
  deleteCompanyForce,
  getParanoidCompany,
  restoreCompany,
} = companyController;

routers.get("/", auth, getAllCompany);
routers.get("/:companyName", auth, getCompanyDetail);
routers.post("/", auth, createCompany);
routers.patch("/:id", auth, updateCompany);
routers.delete("/:id", auth, deleteCompany);
routers.delete("/:id/force", auth, deleteCompanyForce);
routers.get("/deleted/all", auth, getParanoidCompany);
routers.post("/restore/:id", auth, restoreCompany);

module.exports = routers;
