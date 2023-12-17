import { styled, useTheme } from "styled-components";
import companyLogo from "../../assets/company_logo.png"; // Import your image
import { useLayout } from "../../Context/Layout";
import { Icon } from "../../assets/Icon";

const StyledTitle = styled.div`
  margin: 0px 10px 0px 10px;
  font-weight: 400;
  width: auto;
  opacity: ${({ collapse }) => (collapse ? 0 : 1)};
  transition: ${({ collapse }) =>
    collapse ? "opacity 0.1s ease" : "opacity 2.0s ease"};
  line-height: inherit;
  font-size: x-large;
`;

const StyledLogo = styled.img`
  background-color: #cdc1c1;
  padding: 10px 20px 10px 20px;
  box-shadow: 0px 3px 5px #3f3434;
  cursor: pointer;
  height: 40px;
  width: 40px;
`;

const StyledBrandContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  padding: 10px 20px 10px 20px;
  border-bottom: 1px solid #767d85;
`;

export const Brand = ({ title }) => {
  const { collapse } = useLayout();
  const {theme} = useTheme()
  return (
    <StyledBrandContainer theme={theme}>
      {/* <StyledLogo src={companyLogo} /> */}
      <Icon type="globe" height="40" width="40"></Icon>
      <StyledTitle collapse={collapse}>{title}</StyledTitle>
    </StyledBrandContainer>
  );
};
