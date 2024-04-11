import React, { createContext, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled, { useTheme } from "styled-components";

const StyledModal = styled(Modal)`
  border-radius: 4px 4px 4px 4px;
`;

const StyledModalHeader = styled(Modal.Header)`
  background-color: ${({ theme, type }) =>
    type == "alert" ? theme.color.danger : theme.color.secondary};
  color: ${({ theme, type }) =>
    type == "alert" ? theme.color.text : theme.color.text};
  border-radius: 4px 4px 0px 0px;
  padding: 8px 8px 8px 8px;
`;

const StyledModalFooter = styled(Modal.Footer)`
  border-radius: 0px 0px 0px 0px;
`;

const DialogueContext = createContext();

export const useDialogue = () => {
  return useContext(DialogueContext);
};

export const DialogueProvider = ({ children }) => {
  const [dialogue, setDialogue] = useState({ show: false });

  const { theme } = useTheme();

  const showDialogue = (attribs) => {
    setDialogue({ show: true, ...attribs });
  };

  const handleClose = () => {
    setDialogue({ show: false });
  };

  const handleContinue = () => {
    setDialogue({ show: false });
    dialogue.callback();
  };

  const value = {
    showDialogue,
  };

  return (
    <DialogueContext.Provider value={value}>
      <StyledModal
        show={dialogue.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        type={dialogue.type}
        backdropClassName="test"
      >
        <StyledModalHeader closeButton theme={theme} type={dialogue.type}>
          <Modal.Title>{dialogue.title}</Modal.Title>
        </StyledModalHeader>
        <Modal.Body>{dialogue.body}</Modal.Body>
        <StyledModalFooter>
          {dialogue.cancel && (
            <Button variant="secondary" onClick={handleClose}>
              {dialogue.cancel}
            </Button>
          )}
          <Button variant="primary" onClick={handleContinue}>
            {" "}
            {dialogue.ok}
          </Button>
        </StyledModalFooter>
      </StyledModal>
      {children}
    </DialogueContext.Provider>
  );
};
