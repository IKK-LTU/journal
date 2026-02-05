import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";
import { Bird } from "lucide-react";

import { styled } from "@mui/material/styles";


import { ROUTES } from "@/router/routes";

const Welcome = () => {
  const navigate = useNavigate();

  const handleDayClick = () => navigate(ROUTES.LOGIN.path);

  return (
    <StyledContainer>
      <Stack>
        <Typography variant="h1">Labas</Typography>
        <Typography variant="h5" color="neutral">Smagu, kad prisijungei</Typography>
      </Stack>

      <Stack
        sx={{
          my: 3,
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
    </StyledContainer>
  );
};

export default Welcome;

const StyledContainer = styled(Stack)`
  display: flex; 
  flex-direction: column;
  padding: 32px 16px;
  margin: auto;
  gap: 32px;
`