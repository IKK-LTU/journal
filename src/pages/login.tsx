import { useLazyGetUserByIdQuery } from "@/api/services/userApi";
import Button from "@/components/atoms/buttons/Button";
import Title from "@/components/atoms/text/Title";
import TextInput from "@/components/atoms/TextInput";
import Container from "@/components/layouts/Container";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [getUserById] = useLazyGetUserByIdQuery();

  const [value, setValue] = useState("");

  const { currentUser, removeUser } = useCurrentUser();

  const handleLogin = () => {
    if (!value) return;

    const idNumber = Number(value);

    getUserById({ id: idNumber }).then(() => {});
  };

  const onClick = () => {
    if (currentUser) return removeUser();
    if (value) return handleLogin();
  };

  return (
    <Container>
      <div>
        <Title>
          {currentUser ? `Labas, ${currentUser.firstName}` : "Prisijunkite"}
        </Title>
        <p>
          {currentUser
            ? "Tavo profilio duomenys"
            : "Įveskite savo prisijungimo duomenis žemiau."}
        </p>
      </div>

      {currentUser ? (
        <ul>
          {Object.entries(currentUser).map(([key, val]) => (
            <li key={key}>{`${key}: ${val}`}</li>
          ))}
        </ul>
      ) : (
        <TextInput
          id="user-id"
          placeholder="Iveskite savo id"
          required
          type="text"
          value={value}
          onChange={(val) => setValue(val.target.value)}
        />
      )}

      <Button onClick={onClick}>
        {currentUser ? "Atsijungti" : "Prisijungti"}
      </Button>
    </Container>
  );
};

export default LoginPage;
