import React from "react";
import styled from "styled-components";
import { useLayout } from "../../Context/Layout";
import { useApp } from "../../Context/Application";

const StyledContent = styled.div`
  margin-left: ${({ collapse }) => (collapse ? "5rem" : "250px")};
  height: calc(100vh - calc(3.5rem + 5px) - calc(3.5rem + 5px));
  background-color: ${({ theme }) => theme.color.background};
  transition: margin-left 0.6s ease;
  overflow-y: scroll;
  padding: 10px;
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
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.secondary};
    margin: 5px 0px 5px 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.borderInverse};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color.border};
  }
`;

const Content = ({ children, protect }) => {
  const { collapse } = useLayout();
  const { user, setUser } = useApp();

  return !user ? (
    <div>{children}</div>
  ) : (
    <StyledContent collapse={collapse}>{children}</StyledContent>
  );
};

export default Content;
