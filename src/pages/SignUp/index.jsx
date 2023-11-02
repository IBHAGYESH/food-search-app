import { yupResolver } from "@hookform/resolvers/yup";
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
import * as yup from "yup";

import HookTextField from "../../components/HookFormFields/HookTextField";
import { useSignUpMutation } from "../../services/auth";
import validationSchemas from "../../utils/validationSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Meta from "../../components/Meta";

const validationSchema = yup.object({
  email: validationSchemas.email,
  password: validationSchemas.password,
  cpassword: validationSchemas.password.oneOf(
    [yup.ref("password")],
    "Passwords does not match"
  ),
  name: validationSchemas.fullName,
});

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [signUp, { isLoading, data: responseData, error, isSuccess }] =
    useSignUpMutation();

  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      cpassword: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const onSubmit = useCallback(
    async (data) => {
      try {
        await signUp(data);

        if (!error) {
          reset();
          navigate("/log-in");
        } else {
          // toast notification
        }
      } catch (err) {
        console.log("err", err);
      }
    },
    [navigate, signUp]
  );
  return (
    <Container component="main" maxWidth="xs">
      <Meta title="Sign Up" />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <HookTextField
            control={control}
            margin="normal"
            required
            fullWidth
            id="name"
            label="FullName"
            name="name"
          />
          <HookTextField
            control={control}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <HookTextField
            control={control}
            required
            fullWidth
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
          <HookTextField
            control={control}
            required
            fullWidth
            name="cpassword"
            label="Confirm Password"
            id="Cpassword"
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
            Sign up
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link
                sx={{ cursor: "pointer" }}
                variant="body2"
                underline="none"
                color="secondary"
                onClick={() => navigate("/log-in")}
              >
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
