import React, { useEffect, useState } from "react";
import Text from "./Text";
import Option from "./Option";
import styled, { useTheme } from "styled-components";
import { useForm } from "../Context";
import { Profiler } from "react";
import Search from "./Search";
const InputContainer = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.color.secondary};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledError = styled.div`
  color: ${({ theme }) => theme.color.danger};
  font-size: 0.8em;
  margin-top: 5px;
`;

const Input = ({
  label,
  type,
  id,
  placeholder,
  validators = [],
  customValidators = [],
  source,
  val,
}) => {
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const [value, setValue] = useState(val);
  const { handleFormChange, validateOnChange, validateOnBlur } = useForm();

  useEffect(() => {
    setValue(val);
  }, [val]);

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFormChange(e.target.id, e.target.value);
    validateOnChange(
      e.target.value,
      validators,
      customValidators,
      setError,
      label,
      id
    );
  };

  const handleBlur = (e) => {
    validateOnBlur(
      e.target.value,
      validators,
      customValidators,
      setError,
      label,
      id
    );
  };

  return (
    <InputContainer key={id} theme={theme}>
      <label htmlFor={id}>{label}</label>
      {(() => {
        switch (type) {
          case "text":
          case "password":
          case "email":
            return (
              <Text
                label={label}
                type={type}
                id={id}
                placeholder={placeholder}
                validators={validators}
                customValidators={customValidators}
                value={value}
                setError={setError}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            );
          case "option":
            return (
              <Option
                label={label}
                type={type}
                id={id}
                value={value}
                placeholder={placeholder}
                validators={validators}
                customValidators={customValidators}
                setError={setError}
                source={source}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            );
            case "search":
              return (
                <Search
                  label={label}
                  type={type}
                  id={id}
                  value={value}
                  placeholder={placeholder}
                  validators={validators}
                  customValidators={customValidators}
                  setError={setError}
                  source={source}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              );
          default:
            return null;
        }
      })()}
      {error && <StyledError className="error-message">{error}</StyledError>}
    </InputContainer>
  );
};

export default Input;
