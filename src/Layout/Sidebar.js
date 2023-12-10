import React from "react";
import styled from "styled-components";

const StyledSideBar = styled.aside`
  background-color: #343a40;
  box-shadow: 1px 0px 5px 0px #295e60;
  position: absolute;
  top: 0px;
  left: 0px;
  transition: width 0.6s ease;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Set the sidebar height to 100% of the viewport height */
  justify-content: space-between; /* Use space-between to push items to the top and bottom */
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
  return <StyledSideBar collapse={collapse} />;
};

export default Sidebar;
