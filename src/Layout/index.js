import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Container } from "react-bootstrap";
import { LayoutProvider } from "../Context/Layout";
import Header from "./Header";

import { useApp } from "../Context/Application";
import themes from "../Theme";
import { Route, Routes } from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import User from "../Pages/User";
import Role from "../Pages/Role/Role";

import Router from "../Routing/Router";

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
              element={<Router component={<Dashboard />} protect={true} />}
            />
            <Route
              path="/dashboard"
              element={<Router component={<Dashboard />} protect={true} />}
            />
            <Route
              path="/role"
              element={<Router component={<Role />} protect={true} />}
            />
            <Route
              path="/user"
              element={<Router component={<User />} protect={true} />}
            />
            <Route path="/login" element={<Router component={<Login />} />} />
            <Route
              path="/register"
              element={<Router component={<Register />} />}
            />
          </Routes>
        </StyledContainer>
      </LayoutProvider>
    </ThemeProvider>
  );
};

export default Layout;
