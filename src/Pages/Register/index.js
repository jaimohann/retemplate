import React from "react";

import {
  FormProvider,

} from "../Components/Forms/Elements/Context";

import Format from "./Format";


const Register = ({ children }) => {
  

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <div
        style={{
          width: "400px",
          position: "relative",
        }}
      >
        <FormProvider>
          <Format />
        </FormProvider>
      </div>
    </div>
  );
};

export default Register;
