import React from "react";
import styled, { useTheme } from "styled-components";
import { Navbar } from "react-bootstrap";
import { useLayout } from "../../Context/Layout";

const StyledFooter = styled(Navbar)`
  margin-left: ${({ collapse }) => (collapse ? "5rem" : "250px")};
  font-size: 2rem;
  background-color: ${({ theme }) => theme.color.primary};
  border-top: ${({ theme }) => "1px solid " + theme.color.border};
  transition: margin-left 0.6s ease;
`;

const Footer = () => {
  const { collapse } = useLayout();
  const { theme } = useTheme();
  return (
    <StyledFooter fixed="bottom" theme={theme} collapse={collapse}>
      Footer
    </StyledFooter>
  );
};

export default Footer;
