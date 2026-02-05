import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";
import { Bird } from "lucide-react";

import Container from "@/components/layouts/Container";

import { ROUTES } from "@/router/routes";

const Welcome = () => {
  const navigate = useNavigate();

  const handleDayClick = () => navigate(ROUTES.LOGIN.path);

  return (

    <Container>
      <Stack
        sx={{ width: "100%" }}
      >
        <Typography variant="h1">Labas</Typography>
        <Typography variant="h5" color="neutral">Džiugu, kad prisijungei</Typography>
      </Stack>

      <Stack
        sx={{
          my: 4,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Bird height={300} width={300} />
      </Stack>

      <Button variant="contained" fullWidth onClick={handleDayClick}>
        Let's start
      </Button>
    </Container>
  );
};

export default Welcome;

