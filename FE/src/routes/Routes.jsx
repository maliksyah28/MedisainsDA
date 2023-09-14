import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

import RegisterAdmin from "../pages/RegisterAdmin";

function AppRoute() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/registerAdmin" element={<RegisterAdmin />} />
    </Routes>
  );
}

export default AppRoute;
