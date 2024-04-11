import React from "react";
import { EntityProvider } from "../Components/Entity";
import Form from "./Form";

const Login = () => {
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
        <EntityProvider form={<Form />}></EntityProvider>
      </div>
    </div>
  );
};

export default Login;
