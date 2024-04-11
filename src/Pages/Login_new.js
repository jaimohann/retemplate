import React, { useEffect } from "react";
import { useApp } from "../Context/Application";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser, publicRequest } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({
        email: "jai@mohan.com",
        password: "password1",
      }),
    };

    const resp = await publicRequest("/v1/auth/login", options);
    setUser(resp);
    // Redirect to another page after setting the user
    navigate("/", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
