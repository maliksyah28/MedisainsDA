import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

function AppRoute() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}

export default AppRoute;
