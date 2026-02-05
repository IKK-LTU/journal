import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { useLazyGetUserByIdQuery } from "@/api/services/userApi";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ROUTES } from "@/router/routes";
import Container from "@/components/layouts/Container";

type LoginFormValues = {
  usernameOrEmail: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [getUserById] = useLazyGetUserByIdQuery();
  const { currentUser, removeUser } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  //TODO handle login
  const onSubmit = async (data: LoginFormValues) => {
    /**
     * TEMP / DEMO LOGIC
     * You were previously logging in via numeric ID.
     * Keeping equivalent behavior here.
     */


    await getUserById({ id: 1 }).then(() => {
      navigate(ROUTES.HOME.path);
    })
  };

  const onClick = () => {
    if (currentUser) {
      removeUser();
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h1">
          {currentUser ? `Labas, ${currentUser.firstName}` : "Prisijunkite"}
        </Typography>

        <Typography variant="h5" color="neutral">
          {currentUser
            ? "Tavo profilio duomenys"
            : "Įveskite savo prisijungimo duomenis žemiau."}
        </Typography>
      </Box>

      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ width: "100%" }}
      >
        {currentUser ? (
          <ul>
            {Object.entries(currentUser).map(([key, val]) => (
              <li key={key}>{`${key}: ${val}`}</li>
            ))}
          </ul>
        ) : (
          <>
            <TextField
              label="Username arba el. paštas"
              placeholder="Įveskite vartotojo vardą arba el. paštą"
              error={!!errors.usernameOrEmail}
              helperText={errors.usernameOrEmail?.message}
              {...register("usernameOrEmail", {
                required: "Šis laukas yra privalomas",
              })}
            />

            <TextField
              label="Slaptažodis"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Slaptažodis yra privalomas",
                minLength: {
                  value: 6,
                  message: "Mažiausiai 6 simboliai",
                },
              })}
            />
          </>
        )}

        <Button
          fullWidth
          variant="contained"
          type={currentUser ? "button" : "submit"}
          onClick={currentUser ? onClick : undefined}
          disabled={isSubmitting}
        >
          {currentUser ? "Atsijungti" : "Prisijungti"}
        </Button>
      </Stack>
    </Container>
  );
};

export default LoginPage;
