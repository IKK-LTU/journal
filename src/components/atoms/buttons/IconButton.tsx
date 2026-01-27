import React from "react";
import { styled, keyframes } from "@mui/material/styles";

enum Color {
  Primary = "primary",
  Secondary = "secondary",
}

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
  color?: Color | "transparent";
};

const IconButton = ({ icon, onClick, color, ...props }: IconButtonProps) => {
  return (
    <StyledIconBtn onClick={onClick} $color={color} {...props}>
      {icon}
    </StyledIconBtn>
  );
};

export default IconButton;

const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

const StyledIconBtn = styled("button")<{ $color?: Color | "transparent" }>`
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  background: ${(props) => {
    switch (props.$color) {
      case Color.Primary:
        return "#121212d8";
      case "transparent":
        return "none";
      default:
        return "#121212c7";
    }
  }};

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    animation: ${scaleUp} 0.2s alternate ease-in-out;
    background: #1212124c;
  }
`;
