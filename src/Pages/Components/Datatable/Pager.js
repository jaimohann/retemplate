import React from "react";
import styled, { useTheme } from "styled-components";
import { Icon } from "../../../assets/Icon";

const PagerControl = styled.div`
  margin: 0px 2px 0px 2px;
  padding: 18px;
  height: 10px;
  width: 10px;
  background-color: ${({ theme }) => theme.color.text};
  font-weight: 400;
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.text};
    box-shadow: 0px 3px 5px ${({ theme }) => theme.color.borderInverse};
  }


`;

const PagerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-content: center;
  align-items: center;
`;
const PagerControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const Pager = ({

  currentPage,
  length,
  handlePageChange,
  totRecords,
}) => {
  const { theme } = useTheme();
  return (
    <PagerContainer>
      <PagerControlContainer>
        <Icon
          type="angleleft"
          width={30}
          height={30}
          isLink={currentPage <= 1 ? false : true}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {Array.from({
          length: length > 5 ? 5 : length,
        }).map((_, index) => (
          <PagerControl
            onClick={() => handlePageChange(index)}
            active={
              length <= 5 ? index + 1 : length - 5 + index + 1 == currentPage
            }
            theme={theme}
          >
            {length <= 5 ? index + 1 : length - 5 + index + 1}
          </PagerControl>
        ))}
        <Icon
          type="angleright"
          width={30}
          height={30}
          isLink={currentPage >= length ? (!totRecords ? true : false) : true}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </PagerControlContainer>
    </PagerContainer>
  );
};

export default Pager;

