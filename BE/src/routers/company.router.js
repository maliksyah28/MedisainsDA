const express = require("express");
const routers = express.Router();
const { companyController } = require("../controllers");
const { auth } = require("../helpers/auth");
const { getAllCompany, getCompanyDetail, createCompany, updateCompany } =
  companyController;

routers.get("/", auth, getAllCompany);
routers.get("/:companyName", auth, getCompanyDetail);
routers.post("/", auth, createCompany);
routers.patch("/:id", auth, updateCompany);

module.exports = routers;
