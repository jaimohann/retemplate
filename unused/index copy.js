import React from "react";

import {
  FormProvider,

} from "../Components/Forms/Context";

import Format from "../src/Pages/Login/Form/Format";


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
