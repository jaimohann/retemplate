import styled, { useTheme } from "styled-components";
import Th from "./Th";
import Tr from "./Tr";
import { useDataTable } from "./DTContext";
import { useEffect } from "react";

const StyledTHead = styled.thead``;

const THead = ({ handleSort }) => {
  const { theme } = useTheme();
  const { serialNo, actions, columns } = useDataTable();
  return (
    <StyledTHead>
      <Tr theme={theme}>
        {serialNo.required && (
          <Th
            name={serialNo.name}
            title={serialNo.title}
            colWidth={serialNo.width}
            align={serialNo.align}
            handleSort={handleSort}
          ></Th>
        )}
        {columns.map((column) => (
          <Th
            name={column.name}
            handleSort={handleSort}
            hidden={column.hidden}
            theme={theme}
            title={column.displayName || column.name}
            colWidth={column.width}
          />
        ))}
        {actions.required && (
          <Th
            name={actions.name}
            title={actions.title}
            colWidth={actions.width}
            align={actions.align}
          />
        )}
      </Tr>
    </StyledTHead>
  );
};

export default THead;
