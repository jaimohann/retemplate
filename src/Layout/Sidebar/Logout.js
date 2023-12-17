import React from "react";

import styled, { useTheme } from "styled-components";

import { useLayout } from "../../Context/Layout";

import Collapsible from "./Components/Collapsible";

const Logout = () => {
  const { collapse } = useLayout();
  const { theme } = useTheme();
  return (
    <Collapsible
      collapse={collapse}
      theme={theme}
      icon={"logout"}
      title={"Logout"}
      isLink={true}
      fontSize={1.25}
    ></Collapsible>
  );
};

export default Logout;
