import styled, { useTheme } from "styled-components";
import { Icon } from "../../../assets/Icon";

const StyledTh = styled.th`
  background-color: ${({ theme }) => theme.color.borderInverse};
  padding: 10px;
  text-align: left;
  cursor: pointer;
  width: ${({ colWidth }) => colWidth}; /* Set a fixed width for the header cells */
  box-sizing: border-box;
  color: ${({ theme }) => theme.color.text};
`;

const ThContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: ${({align}) => align ? align : "flex-start"};
  align-items: center;
  flex-wrap: wrap;
  padding-left: 5px;
  border-left: 1px solid ${({theme}) => theme.color.border};
`;

const Th = ({
  name,
  children,
  handleSort,
  title,
  sortKey,
  sortOrder,
  hidden,
  colWidth,
  align
}) => {
  const { theme } = useTheme();
  return (
    <StyledTh
      theme={theme}
      onClick={handleSort ? () => handleSort(name) : null}
      hidden={hidden}
      colWidth={colWidth}
      
    >
      <ThContainer align={align}>
        <div>{title}</div>
        {sortKey == name && (
          <Icon
            type={sortOrder == "asc" ? "sortup" : "sortdown"}
            width={24}
            height={24}
          ></Icon>
        )}
      </ThContainer>

      {children}
    </StyledTh>
  );
};

export default Th;
