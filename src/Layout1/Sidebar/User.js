import { styled } from "styled-components";

import companyLogo from "../../assets/company_logo.png"; // Import your image
import { useLayout } from "../../Context/Layout";
import { Icon } from "../../assets/Icon";


const StyledUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: white;
  padding: 20px 20px 20px 20px;
  border-bottom: 1px solid #767d85;
`;

const StyledAvatar = styled.img`
  background-color: #cdc1c1;
  padding: 10px 20px 10px 20px;
  box-shadow: 0px 3px 5px #3f3434;
  cursor: pointer;
  height: 40px;
  width: 40px;
  opacity: ${({ collapse }) => (collapse ? 0 : 1)};
  transition: ${({ collapse }) =>
    collapse ? "opacity 0.1s ease" : "opacity 2.0s ease"};
`;

const StyledUser = styled.div`
  margin: 0px 10px 0px 10px;
  font-weight: 500;
  width: auto;
  opacity: ${({ collapse }) => (collapse ? 0 : 1)};
  transition: ${({ collapse }) =>
    collapse ? "opacity 0.1s ease" : "opacity 2.0s ease"};
  line-height: inherit;
  font-size: larger;

`;

export const User = ({ name }) => {
  const { collapse } = useLayout();
  return (
    <StyledUserContainer collapse={collapse}>
      {/* <StyledAvatar  src={companyLogo} collapse={collapse}/> */}
      <Icon type="avatar" height="50" width="50"></Icon>
      <StyledUser collapse={collapse}>{name}</StyledUser>
    </StyledUserContainer>
  );
};
