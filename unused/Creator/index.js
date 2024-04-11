import styled, { keyframes, useTheme } from "styled-components";

import React, { useEffect, useState } from "react";
// import { useSocket } from "../../../Context/socket";

import { Icon } from "../../src/assets/Icon";
import { Button } from "../../src/Pages/Components/Form/Button";
import { useApp } from "../../src/Context/Application";
import { Modal } from "../../src/Pages/Components/Form/Modal";
import { useDialogue } from "../../src/Context/Dialogue";
import Input from "../../src/Pages/Components/Form/Input";
import {
  StyledForm,
  StyledFormContainer,
  StyledTitleContainer,
  CloseButton,
  StyledButtonContainer,
} from "./Styles";

export const MakeForm = (props) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");
  const { showDialogue } = useDialogue();
  const { theme } = useTheme();
  const { publicRequest } = useApp();

  const { title, controls, submit, formName, close, endPoint, buttons } =
    props.form;
  const children = props.children;
  const fields = controls
    .filter((cntrl) => !cntrl.displayOnly)
    .map((itm) => itm.id);

  const handleFormChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleValidationChange = (controlId, isValid) => {
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [controlId]: isValid,
    }));
  };

  const isFormValid = () => {
    for (const controlId in validationStatus) {
      if (!validationStatus[controlId]) {
        return false;
      }
    }
    return true;
  };

  let action = buttons.find((btn) => btn["action"] == "submit");

  if (action) var handleSubmit = action.handler;

  action = null;

  action = buttons.find((btn) => btn["action"] == "reset");

  if (action) var handleReset = action.handler;

  action = null;

  action = buttons.find((btn) => btn["action"] == "cancel");

  if (action) var handleCancel = action.handler;

  action = null;

  if (!handleSubmit) {
    handleSubmit = async (e) => {
      e.preventDefault();
      const options = {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify(
          Object.keys(formData).reduce((acc, key) => {
            if (fields.includes(key)) {
              acc[key] = formData[key];
            }
            return acc;
          }, {})
        ),
      };
      const response = await publicRequest(`/${"v1"}/${endPoint}`, options);
      if (response.code) {
        showDialogue({
          type: "alert",
          title: "Login",
          body: response.message,
          ok: "OK",
          callback: () => {
            console.log("test");
          },
        });
      } else submit.handler(response);
    };
  }

  if (!handleReset)
    handleReset = () => {
      setFormData({});
      setValidationStatus({});
    };

  if (!handleCancel) {
    handleCancel = (e) => {
      e.preventDefault();
    };
  }

  return (
    <StyledFormContainer theme={theme}>
      {title && title != "" && (
        <>
          <StyledTitleContainer theme={theme}>
            {title}
            {close && (
              <CloseButton onClick={handleCancel} title="Close">
                <Icon type={"close"} height={"20px"} width={"20px"}></Icon>
              </CloseButton>
            )}
          </StyledTitleContainer>
        </>
      )}

      <StyledForm onSubmit={handleSubmit}>
        {/* {formError && (
            <Modal
              title={title}
              formError={formError}
              handleClose={handleCloseModal}
              handleOk={handleOk}
            ></Modal>
          )} */}
        {children
          ? React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onValidationChange: handleValidationChange,
                onChange: handleFormChange,
                formData: formData,
              })
            )
          : controls.map(
              ({
                id,
                label,
                type,
                placeholder,
                validators,
                customValidators,
              }) => (
                <Input
                  key={id}
                  label={label}
                  id={id}
                  type={type}
                  validators={validators}
                  placeholder={placeholder}
                  customValidators={customValidators}

                />
              )
            )}
        <StyledButtonContainer>
          {buttons.map(({ id, type, title, handler }) => (
            <Button key={id} title={title} id={id} type={type}>
              {title}
            </Button>
          ))}
        </StyledButtonContainer>
      </StyledForm>
    </StyledFormContainer>
  );
};
