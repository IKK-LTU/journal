import React from "react";
import styled from "styled-components";

export type ButtonVariantTypes = "outlined" | "contained" | "text";
export type ButtonColorTypes = "primary" | "secondary" | "neutral";

interface ButtonProps {
  children: React.ReactNode | string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  variant?: ButtonVariantTypes;
  color?: ButtonColorTypes;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  variant = "contained",
  color = "primary",
  onClick,
  ...props
}: ButtonProps) => (
  <StyledButton {...props} variant={variant} color={color} onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;

const color = {
  primary: "#216259ff",
  secondary: "#FF5733",
  neutral: "#898989ff",
  textDark: "#181818ff",
  textLight: "white",
};

const StyledButton = styled.button<{
  variant?: ButtonVariantTypes;
  color?: ButtonColorTypes;
}>`
  cursor: pointer;
  padding: 0.5rem;

  border-radius: 6px;

  font-weight: 600;

  transition: 0.2s all ease-in-out;

  ${(props) => {
    switch (`${props.variant}-${props.color}`) {
      case "outlined-primary":
        return `
        background: transparent;
        border: 2px solid ${color.primary};
        color: ${color.primary};
        &:hover {
            border: 2px solid ${color.textDark};
            color: ${color.textDark};
            background: rgba(0, 0, 0, 0.015);

        }
    `;

      case "outlined-secondary":
        return `
        background-color: transparent;
        border: 2px solid ${color.secondary};
        color: ${color.secondary};
        &:hover {
            color: ${color.neutral};
            background: rgba(0, 0, 0, 0.015);
        }
    `;

      case "outlined-neutral":
        return `
            background-color: transparent;
            border: 2px solid ${color.neutral};
            color: ${color.neutral};
            &:hover {
                background-color: ${color.neutral};
                color: ${color.textDark};
                background: rgba(0, 0, 0, 0.015);
            }
        `;

      case "contained-secondary":
        return `
        background-color: ${color.secondary};
        border: 2px solid ${color.secondary};
        color: ${color.textLight};
        &:hover {
            opacity: 0.95;
        }
        `;

      case "contained-neutral":
        return `
            background-color: ${color.neutral};
            border: 2px solid ${color.neutral};
            color: ${color.textLight};
            &:hover {
                opacity: 0.95;
            }
        `;

      case "text-primary":
        return `
        background-color: transparent;
        border: none;
        color: ${color.primary};
        &:hover {
            opacity: 0.9;
            background: rgba(0, 0, 0, 0.03);
            border-color: 2px solid rgba(0, 0, 0, 0.03);
        }
    `;

      case "text-secondary":
        return `
        background-color: transparent;
        border: none;
        color: ${color.secondary};
        &:hover {
            opacity: 0.9;
            background: rgba(0, 0, 0, 0.03);
            border-color: 2px solid rgba(0, 0, 0, 0.03);
        }
    `;

      case "text-neutral":
        return `
        background-color: transparent;
        border: none;
        color: ${color.neutral};
        &:hover {
            opacity: 0.9;
            background: rgba(0, 0, 0, 0.03);
            border-color: 2px solid rgba(0, 0, 0, 0.03);
        }
    `;
      case "contained-primary":
      default:
        return `
            background-color: ${color.primary};
            border: 2px solid ${color.primary};
            color: ${color.textLight};
            &:hover {
                opacity: 0.95;
            }
        `;
    }
  }}
`;
