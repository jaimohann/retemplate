import React from "react";

import Format from "./Format";
import { FormProvider } from "../../Components/Forms/Elements/Context";

const Register = ({ children }) => {
  return (
    <FormProvider>
      <Format />
    </FormProvider>
  );
};

export default Register;
