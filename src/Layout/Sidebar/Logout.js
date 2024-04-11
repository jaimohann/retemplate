import React from "react";

import styled, { useTheme } from "styled-components";

import { useLayout } from "../../Context/Layout";

import Collapsible from "./Components/Collapsible";
import { useDialogue } from "../../Context/Dialogue";
import { useApp } from "../../Context/Application";

const Logout = () => {
  const { collapse } = useLayout();
  const { theme } = useTheme();
  const { showDialogue } = useDialogue();
  const { logout } = useApp();
  const handleClick = () => {
    showDialogue({
      type: "alert",
      title: "Logout",
      body: "Are you sure you want to logout ?",
      cancel: "No",
      ok: "Yes",
      callback: () => {
        logout();
      },
    });
  };

  return (
    <Collapsible
      collapse={collapse}
      theme={theme}
      icon={"logout"}
      title={"Logout"}
      islink
      fontSize={1.25}
      onClick={(e) => handleClick()}
    ></Collapsible>
  );
};

export default Logout;
