import React from "react";
import PrivateRoute from "./PrivateRoute";
import Sidebar from "../Layout/Sidebar";
import Content from "../Layout/Content";
import Footer from "../Layout/Footer";


const Router = ({ component, protect }) => {
  return protect ? (
    <PrivateRoute>
      <Sidebar />
      <Content>{component}</Content>
      <Footer />
    </PrivateRoute>
  ) : (
    <Content protect={protect}>
      {component} 
    </Content>
  );
};

export default Router;
