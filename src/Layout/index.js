import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Container } from "react-bootstrap";
import { LayoutProvider } from "../Context/Layout";
import Header from "./Header";

import { useApp } from "../Context/Application";
import themes from "../Theme";

import { DialogueProvider } from "../Context/Dialogue";

import Routes from "../Routing/AppRoutes";

const StyledContainer = styled(Container)`
  padding: 0rem;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.background};
`;

const Layout = () => {
  const { activeTheme, user, setUser } = useApp();

  return (
    <ThemeProvider theme={themes[activeTheme]}>
      <DialogueProvider>
        <LayoutProvider>
          <StyledContainer fluid theme={themes[activeTheme]}>
            <Header></Header>
            <Routes />
          </StyledContainer>
        </LayoutProvider>
      </DialogueProvider>
    </ThemeProvider>
  );
};

export default Layout;
