import React, { createContext, useContext, useEffect, useState } from "react";
import Input from "./Input";
import { useApp } from "../../../../Context/Application";
import { useDialogue } from "../../../../Context/Dialogue";
import { Button } from "./Button";
import styled, { useTheme } from "styled-components";
import { Icon } from "../../../../assets/Icon";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEntity } from "../../Entity";
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

const StyledGroupTitleContainer = styled.div`
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

const StyledControlContainer = styled.div`
  margin: 8px 8px 8px 8px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.primary};
`;

const StyledForm = styled.form`
  //margin: 8px 8px 8px 8px;
  //padding: 10px;
  //border: 1px solid ${({ theme }) => theme.color.border};
  //border-radius: 4px;
  //background-color: ${({ theme }) => theme.color.primary};
`;
const StyledButtonContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const StyledCloseButton = styled.button`
  color: ${({ theme }) => theme.color.secondary};
  border: none;
  cursor: pointer;
  border-radius: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  padding-block: 0px;
  padding-inline: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #dd3d3d;
  }
`;

const StyledSection = styled(Row)`
  ${({ container }) => (!container ? " padding: 0px " : " padding: 10px ")};
  margin: 10px;
  ${({ theme, container }) =>
    container && " border: 1px solid " + theme.color.border};
  border-radius: 8px;
  ${({ container }) => container && "box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)"};
  box-sizing: border-box;
  position: relative;
`;

const StyledGroup = styled(Col)`
  ${({ container }) => (!container ? " padding: 0px " : " padding: 0px ")};
  ${({ theme, container }) =>
    container && " border: 1px solid " + theme.color.border};
  border-radius: 8px;
  ${({ container }) => container && "box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)"};
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const FormContext = createContext();

export const useForm = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "No Title",
    close: true,
    controls: { sections: [], groups: [], elements: [] },
    buttons: [],
    endPoint: "",
    submit: {
      title: "Submit",
      actionHandler: (e) => {
        e.preventDefault();
        console.log("Submitted");
      },
      mode: "override",
    },
    reset: {
      title: "Reset",
      actionHandler: (e) => {
        e.preventDefault();
        console.log("Reset");
      },
      mode: "override",
    },
    cancel: {
      title: "Cancel",
      actionHandler: (e) => {
        e.preventDefault();
        console.log("Closed");
      },
      mode: "override",
    },
  });
  const [formData, setFormData] = useState({});
  const [validationStatus, setValidationStatus] = useState({});
  const { publicRequest, privateRequest } = useApp();
  const { showDialogue } = useDialogue();
  const { theme } = useTheme();
  //const activeId = 0;
  const { activeId, formMode } = useEntity() || {};

  const {
    caption,
    title,
    close,
    controls,
    buttons,
    endPoint,
    submit,
    reset,
    cancel,
  } = form;

  const fields = controls.elements
    .filter((e) => !e.displayOnly)
    .map((e) => e.id); //controls.elements.filter(e => !e.displayOnly).map((e) => e) group => group.items.filter(item => !item.displayOnly).map(item => item.id));

  const getData = async () => {
    const options = {
      method: "GET",
      redirect: "follow",
    };
    const response = await privateRequest(
      `/${"v1"}/${"menus"}/${activeId}`,
      options
    );
    loadForm(response);
  };

  useEffect(() => {
    if (formMode == "edit") getData();
  }, [activeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submit.mode == "override") {
      submit.actionHandler(e);
    } else {
      const resp = await submitForm();
      if (submit.mode == "isolate") {
        if (resp.code) {
          showDialogue({
            type: "alert",
            title: title,
            body: resp.message,
            ok: "OK",
            callback: () => {
              console.log("test");
            },
          });
        } else
          showDialogue({
            type: "info",
            title: title,
            body: "Operation Completed successfully.",
            ok: "OK",
            callback: () => {
              navigate("/menu", { repalce: true });
            },
          });
      } else await submit.actionHandler(resp);
    }
  };

  const handleReset = async (e) => {
    if (reset.mode == "override") {
      reset.actionHandler(e);
    } else {
      await resetForm(e);
      await reset.actionHandler();
    }
  };

  const handleCancel = async (e) => {
    if (cancel.mode == "override") {
      cancel.actionHandler(e);
    } else {
      showDialogue({
        type: "info",
        title: title,
        body: "Do you want to Cancel the operation ?",
        ok: "Yes",
        cancel: "No",
        callback: () => {
          navigate("/menu", { repalce: true });
        },
      });

      await cancelForm(e);
      await cancel.actionHandler();
    }
  };

  const submitForm = async (e) => {
    let response = {};
    if (formMode == "create") {
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
      response = await privateRequest(`/${"v1"}/${endPoint}`, options);
    } else {
      const options = {
        method: "PATCH",
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
      response = await privateRequest(
        `/${"v1"}/${endPoint}/${activeId}`,
        options
      );
    }
    return response;
  };

  const resetForm = () => {};

  const cancelForm = () => {};

  const handleFormChange = (id, value) => {
    console.log(formData);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const loadForm = (newFormData) => {
  
    setFormData(newFormData);
  };

  const validateOnChange = async (
    value,
    validators,
    customValidators,
    setError,
    label,
    id
  ) => {
    for (const validator of validators.filter((v) => v.event == "onChange")) {
      const type = validator.rule.split("=")[0];
      const param = validator.rule.split("=")[1];
      switch (type) {
        case "required":
          if (!value.trim()) {
            setError(`${label} is required.`);
            handleValidationChange(id, false);
            return;
          }
          break;
        case "minimum":
          if (value.length < param) {
            setError(`${label} must be at least ${param} characters.`);
            handleValidationChange(id, false);
            return;
          }
          break;
        case "maximum":
          if (value.length > param) {
            setError(`${label} must be at most ${param} characters.`);
            handleValidationChange(id, false);
            return;
          }
          break;
      }
    }
    for (const validator of customValidators.filter(
      (v) => v.event == "onChange"
    )) {
      const result = await validator.rule(value);
      if (!result.valid) {
        setError(result.message);
        handleValidationChange(id, false);
        return;
      }
    }

    setError("");
    handleValidationChange(id, true);
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

  const validateOnBlur = async (
    value,
    validators,
    customValidators,
    setError,
    label,
    id
  ) => {
    for (const validator of validators.filter((v) => v.event == "onBlur")) {
      const type = validator.rule.split("=")[0];
      const param = validator.rule.split("=")[1];
      switch (type) {
        case "required":
          if (!value.trim()) {
            setError(`${label} is required.`);
            handleValidationChange(id, false);
            return;
          }
          break;
        case "minimum":
          if (value.length < param) {
            setError(`${label} must be at least ${param} characters.`);
            handleValidationChange(id, false);
            return;
          }
          break;
        case "maximum":
          if (value.length > param) {
            setError(`${label} must be at most ${param} characters.`);
            handleValidationChange(id, false);
            return;
          }
          break;
      }
    }
    for (const validator of customValidators.filter(
      (v) => v.event == "onBlur"
    )) {
      const result = await validator.rule(value, formData, publicRequest);
      if (!result.valid) {
        setError(result.message);
        handleValidationChange(id, false);
        return;
      }
    }

    setError("");
    handleValidationChange(id, true);
  };

  const renderControls = () => {
    return controls.sections.map(({ sectionId, container }) => (
      <StyledSection container={container}>
        {controls.groups
          .filter((g) => g.sectionId === sectionId)
          .map(({ groupId, title, span, container }) => {
            return (
              <StyledGroup
                key={groupId}
                theme={theme}
                md={span}
                container={container}
              >
                {title && (
                  <StyledGroupTitleContainer>{title}</StyledGroupTitleContainer>
                )}
                <StyledControlContainer theme={theme}>
                  {controls.elements
                    .filter((e) => e.groupId === groupId)
                    .map((elm) => {
                      return (
                        <Input key={elm.id} {...elm} val={formData[elm.id]} />
                      );
                    })}
                </StyledControlContainer>
              </StyledGroup>
            );
          })}
      </StyledSection>
    ));
  };

  const value = {
    setForm,
    formData,
    renderControls,
    handleFormChange,
    handleValidationChange,
    handleSubmit,
    handleReset,
    handleCancel,
    validateOnChange,
    validateOnBlur,
    loadForm,
  };

  return (
    <FormContext.Provider value={value}>
      <StyledFormContainer>
        {caption && caption != "" && (
          <>
            <StyledTitleContainer theme={theme}>
              {caption}
              {close && (
                <StyledCloseButton
                  theme={theme}
                  onClick={handleCancel}
                  title="Close"
                >
                  <Icon
                    type={"close"}
                    height={"30px"}
                    width={"30px"}
                    islink={true}
                  ></Icon>
                </StyledCloseButton>
              )}
            </StyledTitleContainer>
          </>
        )}
        <StyledForm onSubmit={handleSubmit} onReset={handleReset}>
          <StyledButtonContainer>
            {submit && (
              <Button
                key={"submit"}
                title={submit.title}
                id={"submit"}
                type="submit"
                disabled={!isFormValid()}
              >
                {submit.title}
              </Button>
            )}
            {reset && (
              <Button
                key={"reset"}
                title={reset.title}
                id={"reset"}
                type="reset"
              >
                {reset.title}
              </Button>
            )}
            {cancel && (
              <Button
                key={"cancel"}
                title={cancel.title}
                id={"cancel"}
                type="button"
                onClick={handleCancel}
              >
                {cancel.title}
              </Button>
            )}
            {buttons.map(({ id, type, title, handler }) => (
              <Button
                key={id}
                title={title}
                id={id}
                type={type}
                onClick={handler}
              >
                {title}
              </Button>
            ))}
          </StyledButtonContainer>
          {children}
        </StyledForm>
      </StyledFormContainer>
    </FormContext.Provider>
  );
};
