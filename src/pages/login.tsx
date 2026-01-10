import Button from "@/components/atoms/buttons/Button";
import Title from "@/components/atoms/text/Title";
import TextInput from "@/components/atoms/TextInput";
import Container from "@/components/layouts/Container";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };
  return (
    <Container>
      <div>
        <Title>Prisijunkite</Title>
        <p>Įveskite savo prisijungimo duomenis žemiau.</p>
      </div>

      <TextInput
        id="login-form-email"
        type="email"
        placeholder="Enter your email"
        required
      />

      <Button onClick={onClick}>Prisijungti</Button>
    </Container>
  );
};

export default LoginPage;
