import React from "react";
import styled from "styled-components";
import { useLayout } from "../../Context/Layout";
import { useApp } from "../../Context/Application";

const StyledContent = styled.div`
  margin-left: ${({ collapse }) => (collapse ? "5rem" : "250px")};
  min-height: calc(100vh - calc(3.5rem + 5px) - calc(3.5rem + 5px));
  background-color: ${({ theme }) => theme.color.background};
  transition: margin-left 0.6s ease;

  @media (max-width: 1920px) {
    margin-left: ${({ collapse }) => (collapse ? "5rem" : "15.625rem")};
  }
  @media (max-width: 1280px) {
    margin-left: ${({ collapse }) => (collapse ? "5rem" : "15.625rem")};
  }
  @media (max-width: 1024px) {
    margin-left: ${({ collapse }) => (collapse ? "5rem" : "15.625rem")};
  }
  @media (max-width: 767px) {
    margin-left: ${({ collapse }) => (collapse ? "5rem" : "15.625rem")};
  }
  @media (max-width: 480px) {
    margin-left: ${({ collapse }) => (collapse ? "0" : "15.625rem")};
`;

const Content = ({children}) => {
  const { collapse } = useLayout();
  const { user, setUser } = useApp();

  return <StyledContent collapse={collapse}>{children}</StyledContent>;
};

export default Content;
