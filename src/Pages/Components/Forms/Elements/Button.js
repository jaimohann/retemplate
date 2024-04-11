// Import necessary dependencies
import React from "react";
import styled, { useTheme } from "styled-components";

// Define the styled button component
const StyledButton = styled.button`
  padding: 10px 15px;
  margin: 2px;
  background-color: ${({ theme }) => theme.color.success};
  color: ${({ theme }) => theme.color.text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${({disabled,theme}) => disabled ? "#6c757d" : theme.color.success};
  }

  ${({ disabled }) =>
    disabled &&
    `
  background-color: #6c757d;
  cursor: not-allowed;
`}
`;

// Define the Button component
export const Button = ({ onClick, type, children, disabled, title }) => {
  const { theme } = useTheme();
  return (
    <StyledButton
      theme={theme}
      onClick={onClick}
      type={type}
      disabled={disabled}
      title={title}
    >
      {children}
    </StyledButton>
  );
};
