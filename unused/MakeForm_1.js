import styled, { keyframes, useTheme } from "styled-components";

import React, { useEffect, useState } from "react";
// import { useSocket } from "../../../Context/socket";

import { Icon } from "../src/assets/Icon";
import { Button } from "../Form/Elements/Button";
import { useApp } from "../src/Context/Application";
import { Modal } from "../Form/Elements/Modal";
import { useDialogue } from "../src/Context/Dialogue";
import Input from "../Form/Elements/Input";

const StyledFormContainer = styled.div`
  margin: 10px;

  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.text};
  padding: 8px 8px 8px 8px;
  font-size: 1.0em;
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;

  border-radius: 8px 8px 0 0;
  }
`;

const StyledForm = styled.form`
  margin: 10px 10px 10px 10px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.primary};
`;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  padding-block: 0px;
  padding-inline: 4px;
  &:hover {
    background-color: #dd3d3d;
  }
`;

export const MakeForm = (props) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");
  const { showDialogue } = useDialogue();
  const {
    title,
    controls,
    submit,
    cancel,
    reset,
    setState,
    formName,
    close,
    endPoint,
    buttons,
  } = props.form;
  const children = props.children;
  const fields = controls
    .filter((cntrl) => !cntrl.display)
    .map((itm) => itm.id);
  const { theme } = useTheme();
  const { publicRequest } = useApp();

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

  const handleSubmit = async (e) => {
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
      //setFormError(response.message);
    } else submit.handler(response);
  };

  const handleReset = () => {
    setFormData({});
    setValidationStatus({});
    //React.Children.map(children, ({props}) =>  )
  };

  const handleCancel = (e) => {
    e.preventDefault();
    removeMessage(formName);
  };

  // const handleCancel = (id, value) => {
  //   setFormData((prev) => ({ ...prev, [id]: "" }));
  // };

  const removeMessage = (name) => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.filter((message) => message.message !== name),
    }));
  };

  const handleCloseModal = (e) => {
    setFormError(false);
  };

  const handleOk = (e) => {
    setFormError(false);
  };
  return (
    <>
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
            {buttons.map(
              ({
                id,
                type,
                title,
                handler
                
              }) => (
                <Button
                  key={id}
                  title={title}
                  id={id}
                  type={type}
                />
              )
            )}

            {/* {submit && (
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormValid()}
                title={submit.label ? submit.label : "Submit"}
              >
                {submit.label ? submit.label : "Submit"}
              </Button>
            )}
            {reset && (
              <Button
                type="button"
                onClick={handleReset}
                title={reset.label ? reset.label : "Reset"}
              >
                {reset.label ? reset.label : "Reset"}
              </Button>
            )}
            {cancel && (
              <Button
                type="button"
                onClick={handleCancel}
                title={cancel.label ? cancel.label : "Cancel"}
              >
                {cancel.label ? cancel.label : "Cancel"}
              </Button>
            )} */}
          </StyledButtonContainer>
        </StyledForm>
      </StyledFormContainer>
    </>
  );
};
