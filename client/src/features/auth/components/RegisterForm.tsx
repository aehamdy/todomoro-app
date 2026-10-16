import { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerUser } from "../auth.api";
import { registerSchema, type RegisterFormValues } from "../auth.schema";
import { ROUTES } from "../../../routes/paths";

function RegisterForm() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError("");

    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate(ROUTES.login, {
          state: { message: "Account created successfully. Please log in." },
        });
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ??
            "Registration failed. Please try again.",
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Stack
      component="form"
      spacing={2.5}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
    >
      <TextField
        {...register("name")}
        label="Full name"
        autoComplete="name"
        fullWidth
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
      />

      <TextField
        {...register("email")}
        label="Email address"
        type="email"
        autoComplete="email"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <TextField
        {...register("password")}
        label="Password"
        type="password"
        autoComplete="new-password"
        fullWidth
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />

      <TextField
        {...register("confirmPassword")}
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        fullWidth
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
      />

      {serverError && (
        <Alert severity="error" role="alert">
          {serverError}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        Already have an account?{" "}
        <Link
          component={RouterLink}
          to={ROUTES.login}
          underline="hover"
          sx={{ fontWeight: 600 }}
        >
          Log in
        </Link>
      </Typography>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Account created successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default RegisterForm;
