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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
`;

const Header = () => {
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
      <StyledDiv>
        <Icon
          type={"ham"}
          height={"40"}
          width={"40"}
          isLink={true}
          onClick={handleClick}
        ></Icon>
      </StyledDiv>
      <StyledDiv>
        <button onClick={() => setActiveTheme("default")}>Default</button>
        <button onClick={() => setActiveTheme("desert")}>Desert</button>
        <button onClick={() => setActiveTheme("forest")}>Forest</button>
        <button onClick={() => setActiveTheme("bluesky")}>BlueSky</button>
        <button onClick={() => setActiveTheme("sunset")}>Sunset</button>
        <button onClick={() => setActiveTheme("sunrise")}>Sunrise</button>
        <button onClick={() => setActiveTheme("dark")}>Dark</button>
        <button onClick={() => setActiveTheme("light")}>Light</button>
      </StyledDiv>
      <StyledDiv>
        <Icon
          type={activeTheme == "dark" ? "sunshine" : "crescent"}
          height={"40"}
          width={"40"}
          isLink={true}
          hasBackGround={true}
          backGroundStyle={"round"}
          backGroundColor={"grey"}
          onClick={() => {
            setActiveTheme(activeTheme == "dark" ? "light" : "dark");
          }}
        ></Icon>
        <Icon
          type={"ham"}
          height={"40"}
          width={"40"}
          isLink={true}
          onClick={handleClick}
        ></Icon>
        <Icon
          type={"isLink"}
          height={"40"}
          width={"40"}
          isLink={true}
          onClick={handleClick}
        ></Icon>
        <Icon
          type={"ham"}
          height={"40"}
          width={"40"}
          isLink={true}
          onClick={handleClick}
        ></Icon>
      </StyledDiv>
    </StyledNavbar>
  );
};

export default Header;
