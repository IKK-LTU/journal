import { useNavigate } from "react-router-dom";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/layouts/Container";

const Home = () => {
  const navigate = useNavigate();

  const onClick = () => {
    console.log("Button clicked");
    navigate("/login");
  };

  return (
    <Container>
      <div>
        <h1>Labas</h1>

        <p>Sveiki atvykę į mano programėlę!</p>
      </div>

      <Field>
        <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
        <Input
          id="login-form-email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </Field>

      <Button onClick={onClick} variant="outline" type="button">
        Prisijungti
      </Button>
    </Container>
  );
};

export default Home;
