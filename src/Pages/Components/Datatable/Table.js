import React from "react";
import styled, { useTheme } from "styled-components";
import Pager from "./Pager";
import { useDataTable } from "./DTContext";
import THead from "./THead";
import Th from "./Th";

import TBody from "./TBody";
import TFooter from "./TFooter";
import { Icon } from "../../../assets/Icon";
import { useNavigate } from "react-router-dom";
import { useEntity } from "../Entity";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 300;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 5px;
  min-height: 100%;
  padding: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
`;

const PagerControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  min-height: 40px;
`;

const PagerControl = styled.div`
  margin: 2px;
  padding: ${({ theme, active }) => (active ? "25px" : "25px")};
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
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.borderInverse};
  cursor: pointer;
  &:hover {
    box-shadow: 0px 3px 5px ${({ theme }) => theme.color.borderInverse};
  }

  ${({ theme, active }) =>
    active && `border: 1px solid ${theme.color.borderInverse}`};
`;

const Table = () => {
  const { serialNo, actions, columns,handleCreate } = useDataTable();
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <TableContainer theme={theme}>
      <PagerControlContainer>
        <PagerControl onClick={handleCreate}>
          <Icon type="circleplus" islink={true} height={40} width={40}></Icon>
        </PagerControl>
        <PagerControl>
          <Icon type="print" islink={true} height={40} width={40}></Icon>
        </PagerControl>
      </PagerControlContainer>

      <StyledTable>
        <THead>
          {serialNo.required && <Th></Th>}
          {columns.map((column) => (
            <Th
              hidden={column.hidden}
              colWidth={column.colWidth}
              align={column.align}
            ></Th>
          ))}
          {actions.required && <Th></Th>}
        </THead>
        <TBody />
      </StyledTable>
      <TFooter />
    </TableContainer>
  );
};

export default Table;
