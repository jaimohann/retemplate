import React from "react";
import { Routes as BrowserRoutes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import User from "../Pages/User";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Router from "./Router";
import Menu from "../Pages/Menu";

const AppRoutes = () => {
  return (
    <BrowserRoutes>
      <Route
        path="/"
        element={<Router component={<Dashboard />} protect={true} />}
      />
      <Route
        path="/dashboard"
        element={<Router component={<Dashboard />} protect={true} />}
      />
      {/* <Route
          path="/role/*"
          element={<Router component={<Role />} protect={true} />}
        /> */}
      <Route
        path="/user/*"
        element={<Router component={<User />} protect={true} />}
      />
      <Route
        path="/menu/*"
        element={<Router component={<Menu />} protect={true} />}
      />
      <Route path="/login" element={<Router component={<Login />} />} />
      {/* <Route
        path="/register"
        element={<Router component={<Router component={<Register />} />} />}
      /> */}
    </BrowserRoutes>
  );
};

export default AppRoutes;
