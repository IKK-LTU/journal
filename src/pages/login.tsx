import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Stack, styled, TextField, Typography } from "@mui/material";

import { useLazyGetUserByIdQuery } from "@/api/services/userApi";

import useCurrentUser from "@/hooks/useCurrentUser";

import { ROUTES } from "@/router/routes";


const LoginPage = () => {
  const navigate = useNavigate();

  const [getUserById] = useLazyGetUserByIdQuery();

  const [value, setValue] = useState("");

  const { currentUser, removeUser } = useCurrentUser();


  const handleLogin = () => {
    if (!value) return;

    const idNumber = Number(value);

    getUserById({ id: idNumber }).then(() => navigate(ROUTES.HOME.path));
  };

  const onClick = () => {
    if (currentUser) return removeUser();
    if (value) return handleLogin();
  };

  return (
    <StyledContainer>
      <Stack>
        <Typography variant="h1">
          {currentUser ? `Labas, ${currentUser.firstName}` : "Prisijunkite"}
        </Typography>
        <Typography variant="h5" color="neutral">
          {currentUser
            ? "Tavo profilio duomenys"
            : "Įveskite savo prisijungimo duomenis žemiau."}
        </Typography>
      </Stack>

      <Stack
        sx={{
          width: "100%"
        }}
      >
        {currentUser ? (
          <ul>
            {Object.entries(currentUser).map(([key, val]) => (
              <li key={key}>{`${key}: ${val}`}</li>
            ))}
          </ul>
        ) : (
          <TextField
            id="user-id"
            placeholder="Iveskite savo id"
            required
            type="text"
            value={value}
            onChange={(val) => setValue(val.target.value)}
          />
        )}
      </Stack>

      <Button variant="contained" onClick={onClick}>
        {currentUser ? "Atsijungti" : "Prisijungti"}
      </Button>
    </StyledContainer>
  );
};

export default LoginPage;

const StyledContainer = styled(Stack)`
  display: flex; 
  flex-direction: column;
  padding: 32px 16px;
  margin: auto;
  gap: 32px;
`