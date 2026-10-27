import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useLazyGetUserByIdQuery } from "@/api/services/userApi";
import BackButton from "@/components/ui/BackButton";
import PageShell from "@/components/ui/PageShell";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ROUTES } from "@/router/routes";

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
    defaultValues: { usernameOrEmail: "", password: "" },
  });

  // Demo login until real auth lands: form values are ignored, user 1 is loaded.
  const onSubmit = async () => {
    await getUserById({ id: 1 });
    navigate(ROUTES.HOME.path);
  };

  return (
    <PageShell>
      <BackButton onClick={() => navigate(-1)} />

      <Typography variant="display" sx={{ mt: 1.5, fontSize: 34 }}>
        {currentUser ? `Labas, ${currentUser.firstName}` : "Prisijunk"}
      </Typography>
      <Typography sx={{ mt: 1, mb: 4, color: "text.secondary" }}>
        {currentUser ? currentUser.email : "Įvesk savo prisijungimo duomenis."}
      </Typography>

      {currentUser ? (
        <Button variant="contained" onClick={removeUser} sx={{ alignSelf: "flex-start" }}>
          Atsijungti
        </Button>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="El. paštas arba vartotojo vardas"
            autoComplete="username"
            error={!!errors.usernameOrEmail}
            helperText={errors.usernameOrEmail?.message}
            {...register("usernameOrEmail", { required: "Šis laukas privalomas" })}
          />
          <TextField
            label="Slaptažodis"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Įvesk slaptažodį",
              minLength: { value: 6, message: "Mažiausiai 6 simboliai" },
            })}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 1 }}>
            Prisijungti
          </Button>
        </Box>
      )}
    </PageShell>
  );
};

export default LoginPage;
