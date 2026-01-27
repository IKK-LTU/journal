import { styled } from "@mui/material/styles";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  // Jei nori transient props styled-components
  $variant?: "primary" | "secondary";
}

const TextInput = ({ id, $variant, ...props }: TextInputProps) => {
  return <StyledInput id={id} $variant={$variant} {...props} />;
};
export default TextInput;

const StyledInput = styled("input")<{ $variant?: "primary" | "secondary" }>`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #264353ff;
    outline: none;
  }
`;
