import { styled } from "styled-components";

import { Icon } from "../../assets/Icon";
import { useLayout } from "../../Context/Layout";

const StyledTitle = styled.h5`
  margin: 0px 10px 0px 10px;
  font-weight: 300;
  height: 24px;
  width: auto;
  opacity: ${({ collapse }) => (collapse ? 0 : 1)};
  transition: ${({ collapse }) =>
    collapse ? "opacity 0.1s ease" : "opacity 2.0s ease"};
  line-height: inherit;
`;

const StyledBrandContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: white;
  padding: 10px 20px 10px 20px;
  bottom: 0px;
  left: 0px;
`;

const StyledLogo = styled.img`
  background-color: #cdc1c1;
  padding: 10px 20px 10px 20px;
  box-shadow: 0px 3px 5px #3f3434;
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

export const Logout = ({ value, icon }) => {
  const { collapse } = useLayout();
  return (
    <StyledBrandContainer>
      <Icon type={"logout"} height={"24"} width={"24"} isLink={true}></Icon>
      <StyledTitle collapse={collapse}>{value}</StyledTitle>
    </StyledBrandContainer>
  );
};
