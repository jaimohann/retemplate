import React from "react";
import styled, { useTheme } from "styled-components";
import { useLayout } from "../../Context/Layout";
import logo from "../../assets/logo.png";
import Collapsible from "./Components/Collapsible";

const Brand = () => {
  const { collapse } = useLayout();
  const { theme } = useTheme();
  return (
    <Collapsible
      collapse={collapse}
      theme={theme}
      logo={logo}
      title={"The Small g"}
      logoBackground={true}
      isLink={true}
      fontSize={1.25}
      borderBottom={true}
    ></Collapsible>
  );
};

export default Brand;
