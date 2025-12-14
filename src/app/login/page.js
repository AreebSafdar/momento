'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import {
  Button,
  Box,
  InputBase,
  Stack,
  Typography,
  Paper,
  Tooltip,
  Divider,
  Link,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';
import axios from '../axios';

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();


  const handleLogin = async (data) => {
    console.log(data);
    try {
      let payload = {
        email: data.email,
        password: data.password,
      };
      const response = await axios.post("/api/user/token/", payload);
      console.log("Login successful", response);
      const access = response.data.access
      const refresh = response.data.refresh
      localStorage.setItem("access", access)
      localStorage.setItem("refresh", refresh)

      await fetchUserData(access);
      router.push('/home')
    } catch (error) {
      let message = error.response.data
      if (message?.type == "validation_error") {
        message?.errors?.map((error) => {
          setError(error?.attr, { type: error?.code, message: error?.detail })
        })
      } else if (message?.type == "client_error") {
        setError("password", { type: "validate", message: message?.errors[0].detail })
      }
      // alert(error.message);
    }
  };

  const fetchUserData = async (accessToken) => {
    try {
      const response = await axios.get("/api/user/me/", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log("user data ", response)
      localStorage.setItem("user", JSON.stringify(response.data));

    } catch (error) {
      console.error("fetching error");
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', p: 4 }}>
      <Stack spacing={2} sx={{ p: 2, borderRadius: 2, mb: 4 }}>
        <Stack>
          <Stack
            spacing={3}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              maxWidth: 400,
              margin: '0 auto',
              p: 5,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#f08be4", textAlign: "center" }}
            >
              <b>Momento</b>
            </Typography>

            {/* Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(handleLogin)(e);
            }}>
              {/* Email */}
              <Tooltip
                title={errors.email ? "Please enter a valid email" : ""}
                followCursor
              >
                <Paper
                  sx={{
                    p: '3px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    mt: 1,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Username or Email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                </Paper>
              </Tooltip>
              {errors.email && (
                <Typography sx={{ color: "red", mt: 1 }}>
                  {errors.email.message}
                </Typography>
              )}

              {/* Password */}
              <Tooltip
                title={errors.password ? errors.password.message : ""}
                followCursor
              >
                <Paper
                  sx={{
                    p: '3px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    mt: 1,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      // minLength: {
                      //   value: 6,
                      //   message: "Password must be at least 6 characters",
                      // },
                    })}
                  />
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    aria-label={
                      showPassword ? "hide password" : "show password"
                    }
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Paper>
              </Tooltip>
              {errors.password && (
                <Typography sx={{ color: "red", mt: 1 }}>
                  {errors.password.message}
                </Typography>
              )}

              {/* Log in Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Log in"}
              </Button>
              <Divider sx={{ mt: 2 }}>or</Divider>

              {/* Social Login */}
              <Button
                variant="outlined"
                sx={{
                  color: '#2480f1ff',
                  fontSize: 15,
                  mt: 2,
                  border: "none",
                }}
                fullWidth
                startIcon={<FacebookIcon />}
              >
                Log in with Facebook
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: '#050505ff',
                  fontSize: 13,
                  border: "none",
                }}
                fullWidth
              >
                Forgotten password?
              </Button>
            </form>
          </Stack>

          {/* Bottom Signup Link */}
          <Stack
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              width: 400,
              margin: '0 auto',
              boxShadow: 3,
              p: 3,
              mt: 3,
            }}
          >
            <Typography variant="body2" sx={{ color: "black", textAlign: "center" }}>
              Don't have an account?{" "}
              <Link
                href="/signup"
                underline="hover"
                sx={{ color: "#506febff" }}
              >
                Sign up
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}


