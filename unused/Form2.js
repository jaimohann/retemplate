import React, { createContext, useContext, useEffect, useState } from "react";

import styled, { useTheme } from "styled-components";
import Input from "../src/Pages/Components/Form/Elements/Input";
import { Button } from "../src/Pages/Components/Form/Elements/Button";
import { Icon } from "../src/assets/Icon";
import { useDialogue } from "../src/Context/Dialogue";
import { useApp } from "../src/Context/Application";

const FormContext = createContext();

export const useForm1 = () => {
  return useContext(FormContext);
};

export const FormProvider1 = ({ children }) => {
  const test = "jai";
  const createForm = () => {
    return <div>asdasdasd</div>;
  };

  const value = {
    createForm,
    test
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
