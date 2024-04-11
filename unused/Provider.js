import React from "react";
import { useForm } from "../src/Pages/Components/Forms/Form/FormContext";

import styled from "styled-components";

import { Icon } from "../src/assets/Icon";
import { useTheme } from "styled-components";
import { Button } from "../src/Pages/Components/Forms/Elements/Button";

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
  margin: 8px 8px 8px 8px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.primary};
`;
export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledCloseButton = styled.button`
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

const Provider = ({ format, children }) => {
  const { theme } = useTheme();
  var { title, close, submit, reset, cancel, buttons } = format;

  var { handleSubmit,handleReset,handleCancel } = useForm();

  // let action = submit.actionHandler;

  // if (action) handleSubmit = action;

  // action = null;

  // action = reset.actionHandler;

  // if (action) handleReset = action;

  // action = null;

  // action = cancel.actionHandler;

  // if (action) handleCancel = action;

  // action = null;

  return (
    <StyledFormContainer>
      {title && title != "" && (
        <>
          <StyledTitleContainer theme={theme}>
            {title}
            {close && (
              <StyledCloseButton onClick={handleCancel} title="Close">
                <Icon type={"close"} height={"20px"} width={"20px"}></Icon>
              </StyledCloseButton>
            )}
          </StyledTitleContainer>
        </>
      )}
      <StyledForm onSubmit={handleSubmit} onReset={handleReset}>
        {children}
        <StyledButtonContainer>
          <Button
            key={"submit"}
            title={submit.title}
            id={"submit"}
            type="submit"
          >
            {submit.title}
          </Button>
          <Button key={"reset"} title={reset.title} id={"reset"} type="reset">
            {reset.title}
          </Button>
          <Button
            key={"cancel"}
            title={cancel.title}
            id={"cancel"}
            type="button"
            onClick={handleCancel}
          >
            {cancel.title}
          </Button>
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

export default Provider;
