import React from "react";
import { useApp } from "../Context/Application";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser("A Jai Mohan");
    // Redirect to another page after setting the user
    navigate("/", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      Register
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
