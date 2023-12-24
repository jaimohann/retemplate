import React from "react";
import styled, { useTheme } from "styled-components";
import { useLayout } from "../../Context/Layout";
import Brand from "./Brand";
import Logout from "./Logout";
import User from "./User";
import Menu from "./Menu";

const StyledSidebar = styled.aside`
  top: 0;
  height: 100vh;
  position: absolute;
  background-color: ${({ theme }) => theme.color.secondary};
  box-shadow: 0 0.875rem 1.75rem rgba(0, 0, 0, 0.25),
    0 0.625rem 0.625rem rgba(0, 0, 0, 0.22) !important;
    transition: width 0.6s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 1920px) {
    width: ${({ collapse }) => (collapse ? "5rem" : "15.625rem")};
  }
  @media (max-width: 1280px) {
    width: ${({ collapse }) => (collapse ? "5rem" : "15.625rem")};
  }
  @media (max-width: 1024px) {
    width: ${({ collapse }) => (collapse ? "5rem" : "15.625rem")};
  }
  @media (max-width: 767px) {
    width: ${({ collapse }) => (collapse ? "5rem" : "15.625rem")};
  }
  @media (max-width: 480px) {
    width: ${({ collapse }) => (collapse ? "0" : "15.625rem")};
`;

const Sidebar = () => {
  const { collapse } = useLayout();
  const { theme } = useTheme();
  return (
    <StyledSidebar collapse={collapse} theme={theme}>
      <Brand />
      <User />
      <Menu></Menu>
      <Logout />
    </StyledSidebar>
  );
};

export default Sidebar;
