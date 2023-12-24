import styled from "styled-components";

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.color.primary};
  }
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.border};
  }
`;

const Tr = ({ key,theme,children }) => {
  return <StyledTr key={key} theme={theme}>{children}</StyledTr>;
};

export default Tr;
