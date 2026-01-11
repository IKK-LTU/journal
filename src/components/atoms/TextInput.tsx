import { styled } from "styled-components";

const TextInput = ({
  id,
  value,
  type = "text",
  onChange,
  placeholder,
  className,
  required,
  props,
}: {
  id: string;
  value?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  return (
    <StyledInput
      {...props}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      required={required}
    />
  );
};
export default TextInput;

const StyledInput = styled("input")`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #264353ff;
    outline: none;
  }
`;
