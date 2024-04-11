import React, { useEffect } from "react";
import { useForm } from "../../Components/Forms/Elements/Context";
import { useApp } from "../../../Context/Application";
import { useNavigate } from "react-router-dom";

const Format = ({ children }) => {
  const { renderControls, setForm, formData } = useForm();
  const { setUser } = useApp();
  const navigate = useNavigate();
  const handleSubmit = ({ user, tokens }) => {
    setUser({ user: user.name, token: tokens.access.token });
    navigate("/", { replace: true });
    console.log("Submit");
  };

  const handleRegister = () => {
    navigate("/register", { replace: true });
  };

  const sections = [{ sectionId: 1 }, { sectionId: 2 }, { sectionId: 3 }];

  const groups = [{ groupId: 1, title: "", sectionId: 1 }];

  const elements = [
    {
      groupId: 1,
      label: "E-Mail",
      id: "email",
      type: "email",
      placeholder: "E-mail",
      name: "memberLogin",
      validators: [{ event: "onChange", rule: "required=true" }],
    },
    {
      groupId: 1,
      label: "Password",
      id: "password",
      type: "password",
      placeholder: "password",
      name: "memberPwd",
      validators: [
        { event: "onChange", rule: "required=true" },
        { event: "onChange", rule: "minimum=8" },
        { event: "onChange", rule: "maximum=30" },
      ],
    },
  ];

  const format = {
    formName: "login",
    caption: "",
    title: "Login",
    close: false,
    endPoint: "auth/login",
    submit: { title: "Login", actionHandler: handleSubmit, mode: "extend" },
    controls: { sections, groups, elements },
    buttons: [
      {
        title: "Register",
        type: "button",
        handler: handleRegister
      },
    ],
  };

  useEffect(() => {
    setForm(format);
  }, [formData]);

  return <>{renderControls()}</>;
};

export default Format;
