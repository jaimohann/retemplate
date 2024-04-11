// FormInput.js
import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Text = ({ type, id, placeholder, value, onBlur, onChange }) => {
  return (
    <StyledInput
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      noValidate
    />
  );
};

export default Text;
