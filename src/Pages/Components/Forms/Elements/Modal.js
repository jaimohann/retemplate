// FormInput.js
import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../../assets/Icon";


const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TitleWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin: 0;
`;

const CloseModalButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const OkButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export const Modal = ({ title, formError, handleClose, handleOk }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <ModalHeader>
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          <CloseModalButton onClick={handleClose}><Icon type={"close"} height={"20"} width={"20"}></Icon></CloseModalButton>
        </ModalHeader>
        <p>{formError}</p>
        <OkButton onClick={handleOk}>OK</OkButton>
      </ModalContent>
    </ModalWrapper>
  );
};
