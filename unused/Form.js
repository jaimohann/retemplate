import React from "react";
import { FormProvider } from "./Form1";

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

const Form = ({ children }) => {
  return (
    <FormProvider>
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
        <StyledForm>{children}</StyledForm>
      </StyledFormContainer>
    </FormProvider>
  );
};

export default Form;
