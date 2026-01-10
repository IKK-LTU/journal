import { useNavigate } from "react-router-dom";

import Container from "@/components/layouts/Container";

import TextInput from "@/components/atoms/TextInput";
import Button from "@/components/atoms/buttons/Button";
import Title from "@/components/atoms/text/Title";

const Home = () => {
  const navigate = useNavigate();

  const onClick = () => {
    console.log("Button clicked");
    navigate("/login");
  };

  return (
    <Container>
      <div>
        <Title>Labas</Title>

        <p>Sveiki atvykę į mano programėlę!</p>
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

export default Home;
