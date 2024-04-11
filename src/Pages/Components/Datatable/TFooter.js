import React from "react";
import styled from "styled-components";
import { useDataTable } from "./DTContext";
import Pager from "./Pager";

const StyledTableFooterContainer = styled.div`
  font-weight: 300;
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTableFooter = styled.div`
  font-weight: 300;
  margin: 10px 0px;
`;

const TFooter = ({}) => {
  const { currentPage, itemsPerPage, data, handlePageChange } = useDataTable();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totCount = data.length;
  return (
    <StyledTableFooterContainer>
      <StyledTableFooter>
        {`Showing ${startIndex + 1} to ${
          endIndex > totCount ? totCount : endIndex
        } of ${totCount} records`}
      </StyledTableFooter>

      <Pager
        {...{
          totRecords: null,
          handlePageChange,
        }}
      ></Pager>
    </StyledTableFooterContainer>
  );
};

export default TFooter;
