import React from "react";
import styled, { useTheme, css } from "styled-components";
import { Icon } from "../../../assets/Icon";
import { Link } from "react-router-dom";

const StyledContainer = styled.div`
  margin: ${({ menuLink }) => (menuLink ? "0 .625rem 0 .625rem" : "0")};
  padding: ${({ height, menuLink }) =>
    height
      ? height + .5 + "rem " + (menuLink ? ".625rem" : "1.25rem")
      : .5 + "rem " + (menuLink ? ".625rem" : "1.25rem")};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  border-top: ${({ borderTop, theme }) =>
    borderTop ? " .0625rem " + " solid " + theme.color.borderInverse : "0"};
  border-bottom: ${({ borderBottom, theme }) =>
    borderBottom ? " .0625rem " + " solid " + theme.color.borderInverse : "0"};

  color: ${({ theme }) => theme.color.text};
  cursor: ${({ isLink }) => (isLink ? "pointer" : "default")};

  transition: ${({ collapse }) =>
    collapse ? "width 0.1s ease" : "opacity 8.0s ease"};

  @media (max-width: 1920px) {
    width: ${({ collapse, menuLink }) =>
      collapse ? menuLink ? "3.75rem": "5rem" : menuLink ? "14.375rem" : "15.625rem"};
  }
  @media (max-width: 1280px) {
    width: ${({ collapse, menuLink }) =>
      collapse ? menuLink ? "3.75rem": "5rem" : menuLink ? "14.375rem" : "15.625rem"};
  }
  @media (max-width: 1024px) {
    width: ${({ collapse, menuLink }) =>
      collapse ? menuLink ? "3.75rem": "5rem" : menuLink ? "14.375rem" : "15.625rem"};
  }
  @media (max-width: 767px) {
    width: ${({ collapse, menuLink }) =>
      collapse ? menuLink ? "3.75rem": "5rem" : menuLink ? "14.375rem" : "15.625rem"};
  }
  @media (max-width: 480px) {
    width: ${({ collapse, menuLink }) =>
      collapse ? "0" : menuLink ? "14.375rem" : "15.625rem"};
  }

  ${({ menuLink, theme }) =>
    menuLink &&
    `&:hover {
      background-color: ${theme.color.borderInverse};
      border-radius: 5px;
    `}
`;

const StyledLogo = styled.div`
  background-color: ${({ theme, background }) =>
    background ? theme.color.text : ""};
  padding: ${({ background }) => (background ? "0.125rem" : 0)};
  border-radius: 50%;
`;

const StyledImage = styled.img`
  height: ${({ background }) => (background ? "2.25rem" : "2.5rem")};
  width: ${({ background }) => (background ? "2.25rem" : "2.5rem")};
`;

const StyledTitle = styled.span`
  font-weight: ${({ weight }) => 300};
  font-size: ${({ size }) => (size ? size + "rem" : "1rem")};
  margin: 0 0.625rem;
  opacity: ${({ collapse }) => (collapse ? 0 : 1)};
  transition: ${({ collapse }) =>
    collapse ? "opacity 0.1s ease" : "opacity 8.0s ease"};
`;

const Collapsible = ({
  collapse,
  theme,
  logo,
  title,
  logoBackground,
  icon,
  isLink,
  fontSize,
  weight,
  onClick,
  height,
  borderTop,
  borderBottom,
  menuLink,
  menuLinkRoute,
}) => {
  return (
    <StyledContainer
      collapse={collapse}
      theme={theme}
      isLink={isLink}
      onClick={onClick}
      height={height}
      borderTop={borderTop}
      borderBottom={borderBottom}
      menuLink={menuLink}
    >
      <StyledLogo theme={theme} background={logoBackground} collapse={collapse}>
        {logo ? (
          <StyledImage
            src={logo}
            background={logoBackground}
            collapse={collapse}
          ></StyledImage>
        ) : (
          <Icon type={icon} height={"40"} width={"40"} isLink={true}></Icon>
        )}
      </StyledLogo>
      {!collapse && title && (
        <StyledTitle collapse={collapse} size={fontSize} weight={weight}>
          {menuLinkRoute ? (
            <Link
              to={"/" + menuLinkRoute}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </StyledTitle>
      )}
    </StyledContainer>
  );
};

export default Collapsible;
