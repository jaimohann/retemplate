import React, { createContext, useContext, useEffect, useState } from "react";
import Routing from "../../../Routing/EntityRoutes";
import styled from "styled-components";

const StyledFormContainer = styled.div``;
const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;
const StyledBreadcrumps = styled.div``;

const EntityContext = createContext();

export const useEntity = () => {
  return useContext(EntityContext);
};

export const EntityProvider = ({ title, breadcrumps, search, form }) => {
  const [activeId, setActiveId] = useState();
  const [formMode, setFormMode] = useState("create");
  const [breadCrumps, setBreadCrumps] = useState(breadcrumps);

  const value = { activeId, setActiveId, setFormMode, formMode };

  return (
    <EntityContext.Provider value={value}>
      <StyledFormContainer>
        <StyledTitleContainer>
          {title && <StyledTitle>{title}</StyledTitle>}
          {breadcrumps && <StyledBreadcrumps>{breadCrumps}</StyledBreadcrumps>}
        </StyledTitleContainer>
        <Routing search={search} form={form}></Routing>
      </StyledFormContainer>
    </EntityContext.Provider>
  );
};
