import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HookTextField from "../../components/HookFormFields/HookTextField";
import Meta from "../../components/Meta";
import useAuth from "../../hooks/useAuth";
import { useLoginMutation } from "../../services/auth";
import validationSchemas from "../../utils/validationSchema";

const validationSchema = yup.object({
  email: validationSchemas.email,
  password: validationSchemas.password,
});

function Login() {
  const { auth, setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (values) => {
      try {
        const res = await login(values);
        if (res?.data?.token) {
          localStorage.setItem("x-app-token", res.data.token);
          localStorage.setItem("x-app-user-id", res.data.user_id);
          localStorage.setItem("x-app-user-name", res.data.name);
          setAuth({
            id: res.data.user_id,
            name: res.data.name,
            token: res.data.token,
          });
        } else {
          // toast notification
        }
      } catch (err) {
        console.log("err", err);
      }
    },
    [auth, login]
  );

  return (
    <Box>
      <Meta title="Login" />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <HookTextField
              control={control}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <HookTextField
              fullWidth
              control={control}
              required
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              disableRipple
              type="submit"
              fullWidth
              disabled={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading && (
                <CircularProgress sx={{ mr: 2 }} size={15} color="inherit" />
              )}
              Log In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                  underline="none"
                  color="secondary"
                  onClick={() => navigate("/sign-up")}
                >
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
