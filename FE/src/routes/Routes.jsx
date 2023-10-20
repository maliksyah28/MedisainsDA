import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegisterAdmin from "../pages/RegisterAdmin";
import AccountManagement from "../pages/AccountManagement";
import Company from "../pages/Company";
import CompanyDetail from "../pages/CompanyDetail";
import Brand from "../pages/Brand";
import BrandDetail from "../pages/BrandDetail";

function AppRoute() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/registerAdmin" element={<RegisterAdmin />} />
      <Route exact path="/account-management" element={<AccountManagement />} />
      <Route exact path="/company" element={<Company />} />
      <Route exact path="/company/:companyName" element={<CompanyDetail />} />
      <Route exact path="/brand" element={<Brand />} />
      <Route exact path="/brand/:brandName" element={<BrandDetail />} />
    </Routes>
  );
}

export default AppRoute;
