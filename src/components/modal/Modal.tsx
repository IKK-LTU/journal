import { X } from "lucide-react";
import React from "react";
import { styled } from "styled-components";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal = ({ children, onClose, isOpen }: ModalProps) => {
  return isOpen ? (
    <StyledModalBackdrop>
      <StyledModalContainer>
        <StyledCloseIcon onClick={onClose} />
        {children}
      </StyledModalContainer>
    </StyledModalBackdrop>
  ) : null;
};

export default Modal;

const StyledModalBackdrop = styled("div")`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.59);
`;

const StyledModalContainer = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 350px;

  padding: 32px 16px;
  background: rgba(96, 96, 96, 0.76);
  border-radius: 12px;
`;

const StyledCloseIcon = styled(X)`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;

  transition: 0.3s all ease;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;
