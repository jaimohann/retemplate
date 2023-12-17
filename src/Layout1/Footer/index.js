import Navbar from "react-bootstrap/Navbar";
import { styled, useTheme } from "styled-components";
import { Icon } from "../../assets/Icon";
import { useLayout } from "../../Context/Layout";
import { useApp } from "../../Context/Application";

const StyledNavbar = styled(Navbar)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
  transition: margin-left 0.6s ease;
  background-color: ${({ theme }) => theme.color.primary};
  margin-left: ${({ collapse }) => (collapse ? "80px" : "250px")};
  border-bottom: ${({ theme }) => "1px solid " + theme.color.border};
`;



const Footer = () => {
  const { setCollapse, collapse, collapsePinned, setCollapsePinned } =
    useLayout();
  const { theme } = useTheme();
  const { activeTheme, setActiveTheme } = useApp();
  const handleClick = () => {
    setCollapse(!collapse);
    setCollapsePinned(!collapsePinned);
  };
  return (
    <StyledNavbar collapse={collapse} theme={theme}>
      
    </StyledNavbar>
  );
};

export default Footer;
