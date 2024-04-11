import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "../../Components/Forms/Elements/Context";
import { useApp } from "../../../Context/Application";

const Format = ({ children }) => {
  const { renderControls, setForm, formData } = useForm();
  const { setUser } = useApp();
  const navigate = useNavigate();

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

  const sections = [{ sectionId: 1, container: false }];

  const groups = [
    { groupId: 1, span: 6, title: "", sectionId: 1, container: false },
    { groupId: 2, span: 6, title: "", sectionId: 2, container: false },
  ];

  const elements = [
    {
      groupId: 1,
      label: "Menu Name",
      id: "name",
      type: "text",
      placeholder: "Menu Name",
      name: "name",
      
      validators: [
        { event: "onChange", rule: "required=true" },
        { event: "onChange", rule: "minimum=8" },
        { event: "onChange", rule: "maximum=30" },
      ],
    },
    {
      groupId: 1,
      label: "Parent1",
      id: "parent1",
      type: "option",
      displayOnly:true,
      source: {
        endPoint: "menus/list",
        keyCol: "id",
        valueCol: "name",
        data: {
          groups: [
            {
              id: 1,
              name: "Group 1",
              items: [
                { id: 1, value: "Test1" },
                { id: 2, value: "Test2" },
                { id: 3, value: "Test3" },
                { id: 4, value: "Test4" },
                { id: 5, value: "Test5" },
              ],
            },
            {
              id: 2,
              name: "Group 2",
              items: [
                { id: 6, value: "Test1" },
                { id: 7, value: "Test2" },
                { id: 8, value: "Test3" },
                { id: 9, value: "Test4" },
                { id: 10, value: "Test5" },
              ],
            },
          ],
        },
      },
      placeholder: "Select the Parent",
      name: "parent1",
      validators: [{ event: "onChange", rule: "required=true" }],
    },
    {
      groupId: 1,
      label: "Parent",
      id: "parent",
      type: "search",
      source: {
        endPoint: "menus/list",
        keyCol: "id",
        valueCol: "name",
      },
      placeholder: "Start typing ...",
      name: "parent",
      validators: [{ event: "onChange", rule: "required=true" }],
    },
    {
      groupId: 1,
      label: "Link",
      id: "link",
      type: "text",
      placeholder: "Link",
      name: "link",
      validators: [
        { event: "onChange", rule: "required=true" },
        { event: "onChange", rule: "minimum=8" },
        { event: "onChange", rule: "maximum=30" },
      ],
    },
    {
      groupId: 1,
      label: "Icon",
      id: "icon",
      type: "text",
      placeholder: "Icon",
      name: "icon",
      validators: [{ event: "onChange", rule: "required=true" }],
    },
    {
      groupId: 1,
      label: "Level",
      id: "level",
      type: "number",
      placeholder: "Level",
      name: "level",
    },
  ];

  const format = {
    formName: "menu",
    caption: "",
    title: "Menu",
    close: false,
    endPoint: "menus",
    submit: { title: "Submit", actionHandler: handleSubmit, mode: "isolate" },
    reset: { title: "Reset", actionHandler: handleReset, mode: "extend" },
    cancel: { title: "Cancel", actionHandler: handleCancel, mode: "isolate" },
    controls: { sections, groups, elements },
    buttons: [],
  };

  useEffect(() => {
    setForm(format);
  }, [formData]);

  return <>{renderControls()}</>;
};

export default Format;
