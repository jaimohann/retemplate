import React from "react";
import { FormProvider } from "../src/Pages/Components/Forms/Elements/Form/Context";
import Core from "./Core";

const Register = () => {
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
          <Core></Core>
        </FormProvider>
      </div>
    </div>
  );
};

export default Register;
