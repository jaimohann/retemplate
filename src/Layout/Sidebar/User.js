import React from "react";
import styled, { useTheme } from "styled-components";
import { useLayout } from "../../Context/Layout";
import avatar from "../../assets/avatar.png";
import Collapsible from "./Components/Collapsible";

const User = () => {
  const { collapse } = useLayout();
  const { theme } = useTheme();
  return (
    <Collapsible
      collapse={collapse}
      theme={theme}
      logo={avatar}
      title={"Mark Henry"}
      logoBackground={false}
      isLink={true}
      fontSize={1}
      weight={"600"}
      height={1}
      borderBottom={true}
      margin={true}
    ></Collapsible>
  );
};

export default User;
