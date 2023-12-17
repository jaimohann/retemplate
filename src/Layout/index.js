import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Container } from "react-bootstrap";
import { LayoutProvider } from "../Context/Layout";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Content from "./Content";
import { useApp } from "../Context/Application";
import themes from "../Theme";
import { Outlet, Route, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import User from "../Pages/User";

const StyledContainer = styled(Container)`
  padding: 0rem;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.background};
`;

const Layout = () => {
  const { activeTheme, user, setUser } = useApp();
  return (
    <ThemeProvider theme={themes[activeTheme]}>
      <LayoutProvider>
        <StyledContainer fluid theme={themes[activeTheme]}>
          <Header></Header>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <PrivateRoute>
                    <Sidebar />
                    <Content>
                      <Dashboard></Dashboard>
                    </Content>
                    <Footer />
                  </PrivateRoute>
                </>
              }
            ></Route>
            <Route
              path="/user"
              element={
                <>
                  <PrivateRoute>
                    <Sidebar />
                    <Content>
                      <User></User>
                    </Content>
                    <Footer />
                  </PrivateRoute>
                </>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Content>
                  <Login></Login>
                </Content>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <Content>
                  <Register></Register>
                </Content>
              }
            ></Route>
          </Routes>
        </StyledContainer>
      </LayoutProvider>
    </ThemeProvider>
  );
};

export default Layout;
