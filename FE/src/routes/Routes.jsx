import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegisterAdmin from "../pages/RegisterAdmin";
import AccountManagement from "../pages/AccountManagement";
import Contact from "../pages/Contact";


function AppRoute() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/registerAdmin" element={<RegisterAdmin />} />
      <Route exact path="/account-management" element={<AccountManagement />} />
      <Route exact path="/Contact" element={<Contact />} />
    </Routes>
  );
}

export default AppRoute;
