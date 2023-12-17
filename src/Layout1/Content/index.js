import React from "react";
import styled, { useTheme } from "styled-components";
import { useLayout } from "../../Context/Layout";

const StyledSideBar1 = styled.div`
  top: 0px;
  left: 0px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  margin-left: 250px;
  background-color: ${({ theme }) => "red"};
  box-shadow: 1px 0px 5px 0px #295e60;
  transition: width 0.6s ease;

  @media (max-width: 1920px) {
    width: ${({ collapse }) => (collapse ? "80px" : "100vw")};
  }
  @media (max-width: 1280px) {
    width: ${({ collapse }) => (collapse ? "80px" : "100vw")};
  }
  @media (max-width: 1024px) {
    width: ${({ collapse }) => (collapse ? "80px" : "100vw")};
  }
  @media (max-width: 767px) {
    width: ${({ collapse }) => (collapse ? "80px" : "100vw")};
  }
  @media (max-width: 480px) {
    width: ${({ collapse }) => (collapse ? "0px" : "100vw")};
  }
`;

const Content = ({ children }) => {
  const { collapse, setCollapse, collapsePinned } = useLayout();
  const { theme } = useTheme();

  return (
    <StyledSideBar1 collapse={collapse} theme={theme}>
      {children}
    </StyledSideBar1>
  );
};

export default Content;
