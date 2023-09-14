import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRoute from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./auth/authSlice";
import { getUserByToken } from "./api/userApi";

function App() {
  const dispatch = useDispatch();
  const getUserStore = useSelector((state) => state.auth.id);
  const userLocalStorage = localStorage.getItem("userInfo");
  const getUser = async () => {
    if (!getUserStore) {
      const userData = await getUserByToken(
        JSON.parse(userLocalStorage).accessToken
      );
      dispatch(login(userData.data.data));
    }
  };
  useEffect(() => {
    if (userLocalStorage) {
      getUser();
    }
  }, []);
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
