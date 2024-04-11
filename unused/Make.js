import React from "react";

import { useApp } from "../src/Context/Application";
import { useNavigate } from "react-router-dom";
import { useForm } from "./Form1";

const Make = ({ format, children }) => {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const { handleFormChange } = useForm();

  console.log(handleFormChange);

  const handleResponse = ({ tokens, user }) => {
    setUser({ user: user.name, token: tokens.access.token });
    navigate("/", { replace: true });
  };

  return <>jhhjg</>;
};

export default Make;
