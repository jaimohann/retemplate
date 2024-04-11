import React from "react";
import Form from "../Components/Forms/Elements/Form";
import format from "../../src/Pages/Register/Format";

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
        <Form format={format}></Form>
      </div>
    </div>
  );
};

export default Login;