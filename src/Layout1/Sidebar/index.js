import React from "react";
import styled, { useTheme } from "styled-components";
import { useLayout } from "../../Context/Layout";
import { Brand } from "./Brand";
import { User } from "./User";
import { Logout } from "./Logout";
import Menu from "./Menu";

const StyledSideBar = styled.aside`
  top: 0px;
  left: 0px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;

  background-color: ${({ theme }) => theme.color.primary};
  box-shadow: 1px 0px 5px 0px #295e60;
  transition: width 0.6s ease;

  @media (max-width: 1920px) {
    width: ${({ collapse }) => (collapse ? "80px" : "250px")};
  }
  @media (max-width: 1280px) {
    width: ${({ collapse }) => (collapse ? "80px" : "250px")};
  }
  @media (max-width: 1024px) {
    width: ${({ collapse }) => (collapse ? "80px" : "250px")};
  }
  @media (max-width: 767px) {
    width: ${({ collapse }) => (collapse ? "80px" : "250px")};
  }
  @media (max-width: 480px) {
    width: ${({ collapse }) => (collapse ? "0px" : "250px")};
  }
`;

const Sidebar = () => {
  const { collapse, setCollapse, collapsePinned } = useLayout();
  const { theme } = useTheme();

  return (
    <StyledSideBar collapse={collapse} theme={theme}>
      <Brand title={"My Site"}></Brand>
      <User name="A Jai Mohan"></User>

      <Menu></Menu>
      <Logout value="Log out" icon="logout"></Logout>
    </StyledSideBar>
  );
};

export default Sidebar;
