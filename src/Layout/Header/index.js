import React from "react";
import styled, { useTheme } from "styled-components";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLayout } from "../../Context/Layout";
import { Icon } from "../../assets/Icon";
import Collapsible from "../Sidebar/Components/Collapsible";
import logo from "../../assets/logo.png";
import { useApp } from "../../Context/Application";
import { Link } from "react-router-dom";

const StyledHeader = styled(Navbar)`
  padding: 0.5rem;
  
  background-color: ${({ theme }) => theme.color.primary};
  border-bottom: ${({ theme }) => ".0625rem solid " + theme.color.border};
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
    margin-left: ${({ collapse }) => (collapse ? "0rem" : "15.625rem")};
`;

const StyledSignedOutHeader = styled(Navbar)`
  padding: 0.5rem;

  background-color: ${({ theme }) => theme.color.primary};
  border-bottom: ${({ theme }) => ".0625rem solid " + theme.color.border};
  transition: margin-left 0.6s ease;
  margin-left: 0rem;
`;

const StyledTitle = styled.span`
  font-weight: ${({ weight }) => weight};
  font-size: ${({ size }) => (size ? size + "rem" : "1rem")};
  margin: 0 0.625rem;
  cursor: pointer;
`;

const Header = () => {
  const { collapse, setCollapse } = useLayout();
  const { theme } = useTheme();
  const { user, getUser } = useApp();
  return getUser() ? (
    <StyledHeader theme={theme} collapse={collapse} user={user}>
      <Container fluid style={{ padding: "0px" }}>
        <Nav activeKey="/home">
          <Nav.Item>
            <Icon
              type="ham"
              height={40}
              width={40}
              isLink={true}
              onClick={() => setCollapse(!collapse)}
            ></Icon>
          </Nav.Item>
        </Nav>
      </Container>
    </StyledHeader>
  ) : (
    <StyledSignedOutHeader theme={theme}>
      <Nav activeKey="/">
        <Nav.Item>
          <StyledTitle size={1.25} weight={300}>
            <Link to={`/login`}>{"Login"}</Link>
          </StyledTitle>
        </Nav.Item>
        <Nav.Item>
          <StyledTitle size={1.25} weight={300}>
            <Link to={`/register`}>{"Register"}</Link>
          </StyledTitle>
        </Nav.Item>
      </Nav>
    </StyledSignedOutHeader>
  );
};

export default Header;
