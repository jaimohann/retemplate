import React from "react";
import { FormProvider } from "../src/Pages/Components/Forms/FormContext";


const Form = ({ children }) => {
  return <FormProvider>{children}</FormProvider>;
};

export default Form;
