import React, { createContext, useContext, useEffect, useState } from "react";

import styled, { useTheme } from "styled-components";
import Input from "../src/Pages/Components/Form/Elements/Input";
import { Button } from "../src/Pages/Components/Form/Elements/Button";
import { Icon } from "../src/assets/Icon";
import { useDialogue } from "../src/Context/Dialogue";
import { useApp } from "../src/Context/Application";

export const StyledFormContainer = styled.div`
  margin: 10px;

  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const StyledTitleContainer = styled.div`
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

export const StyledForm = styled.form`
  margin: 10px 10px 10px 10px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.primary};
`;
export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
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

const FormContext = createContext();

export const useForm = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const { theme } = useTheme();
  const { showDialogue } = useDialogue();
  const { publicRequest, privateRequest } = useApp();
  const [validationStatus, setValidationStatus] = useState({});
  const [formError, setFormError] = useState("");

  const handleFormChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleValidationChange = (controlId, isValid) => {
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [controlId]: isValid,
    }));
  };

  const createForm = (form) => {
    const { title, controls, submit, formName, close, endPoint, buttons } =
      form;
    const children = null;
    const fields = controls
      .filter((cntrl) => !cntrl.displayOnly)
      .map((itm) => itm.id);

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
                    onValidationChange={handleValidationChange}
                    onChange={handleFormChange}
                    formData={formData}
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

  const value = {
    createForm,
    handleFormChange,
    handleValidationChange,
    formData,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
