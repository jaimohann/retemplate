import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "../../Components/Forms/Elements/Context";
import { useApp } from "../../../Context/Application";

const Format = ({ children }) => {
  const { renderControls, setForm, formData } = useForm();
  const { setUser } = useApp();
  const navigate = useNavigate();

  const passwordMatch = (value) => {
    if (value != formData["password"]) {
      return {
        valid: false,
        message: "Password & Confirm password does not match.",
      };
    }
    return { valid: true, message: "" };
  };
  const handleSubmit = ({ user, tokens }) => {
    setUser({ user: user.name, token: tokens.access.token });
    navigate("/", { replace: true });
    console.log("Submit");
  };
  const handleReset = () => {
    console.log("Reset");
  };
  const handleCancel = () => {
    console.log("Cancel");
  };

  const sections = [
    { sectionId: 1, container: false },
    { sectionId: 2, container: false },
    { sectionId: 3, container: false },
  ];

  const groups = [
    { groupId: 1, span: 4, title: "", sectionId: 1, container: false },
    { groupId: 2, span:6,title: "", sectionId: 2, container: false },
    { groupId: 3, span:6,title: "", sectionId: 2, container: false },
    { groupId: 4, span: 6, title: "", sectionId: 2, container: false },
  ];

  const elements = [
    {
      groupId: 1,
      label: "User Name",
      id: "username",
      type: "text",
      placeholder: "User Name",
      name: "username",
      validators: [{ event: "onChange", rule: "required=true" }],
    },
    {
      groupId: 2,
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
    {
      groupId: 2,
      label: "Confirm Password",
      id: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      name: "confirmPassword",
      validators: [
        { event: "onChange", rule: "required=true" },
        { event: "onChange", rule: "minimum=8" },
        { event: "onChange", rule: "maximum=30" },
      ],
      customValidators: [{ event: "onBlur", rule: passwordMatch }],
    },

    {
      groupId: 3,
      label: "First Name",
      id: "firstName",
      type: "text",
      placeholder: "First Name",
      name: "firstName",
      validators: [{ event: "onChange", rule: "required=true" }],
    },
    {
      groupId: 3,
      label: "Middle Name",
      id: "middleName",
      type: "text",
      placeholder: "Middle Name",
      name: "middleName",
      validators: [{ event: "onChange", rule: "required=true" }],
    },
    {
      groupId: 3,
      label: "Last Name",
      id: "lastName",
      type: "text",
      placeholder: "Last Name",
      name: "lastName",
      validators: [{ event: "onChange", rule: "required=true" }],
    },
    {
      groupId: 4,
      label: "E-Mail",
      id: "email",
      type: "email",
      placeholder: "E-mail",
      name: "memberLogin",
      validators: [{ event: "onChange", rule: "required=true" }],
    },
    {
      groupId: 4,
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
    title: "",
    close: false,
    endPoint: "auth/login",
    submit: { title: "Submit", actionHandler: handleSubmit, mode: "extend" },
    reset: { title: "Reset", actionHandler: handleReset, mode: "extend" },
    cancel: { title: "Cancel", actionHandler: handleCancel, mode: "override" },
    controls: { sections, groups, elements },
    buttons: [],
  };

  useEffect(() => {
    setForm(format);
  }, [formData]);

  return <>{renderControls()}</>;
};

export default Format;
