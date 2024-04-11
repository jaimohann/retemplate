import styled, { useTheme } from "styled-components";



const StyledTd = styled.td`
  padding: 0.4375rem 0rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  box-sizing: border-box;
  width: ${({ colWidth }) =>
  colWidth}; /* Set a fixed width for the header cells */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  justify-content: ${({ align }) => (align ? align : "flex-start")};
`;

const TdContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: ${({ align }) => (align ? align : "flex-start")};
  align-items: center;
  flex-wrap: wrap;
  padding-left: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: ${({ colWidth }) =>
  colWidth}; /* Set a fixed width for the header cells */
`;

const Td = ({ key, children, hidden, colWidth, align }) => {
  const { theme } = useTheme();
  return (
    <StyledTd
      key={key}
      theme={theme}
      hidden={hidden}
      colWidth={colWidth}
      align={align}
    >
      <TdContainer theme={theme} align={align} colWidth={colWidth}>
        {children}
      </TdContainer>
    </StyledTd>
  );
};

export default Td;
