'use client';

import * as React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
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
    TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FacebookIcon from '@mui/icons-material/Facebook';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from '../axios'
import OTP from '@/app/components/otp';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showOTP, setShowOTP] = useState(false)

    const {
        control,
        watch,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();
    const onSubmit = (d) =>
        alert(JSON.stringify(d));
    const handleSignup = async (data) => {
        console.log(data)
        try {
            let payload = {
                email: data.email,
                password: data.password,
                name: data.fullName,
                username: data.username,
                // Convert dayjs to string format (YYYY-MM-DD)
                date_of_birth: data.dateOfBirth?.format("YYYY-MM-DD"),
            };
            const response = await axios.post("/api/user/register/", payload)
            setShowOTP(true)
        } catch (error) {
            console.log(error.response)
            let message = error.response.data
            if (message?.type == "validation_error") {
                message?.errors?.map((error) => {
                    setError(error?.attr, { type: error?.code, message: error?.detail })
                })
            } else if (message?.type == "server_error") {
                alert(message?.errors[0]?.detail)
            }
            // alert(error.message)
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
                        <Typography variant="h4" sx={{ color: "#f08be4", textAlign: "center" }}>
                            <b>Momento</b>
                        </Typography>

                        {
                            showOTP ? <OTP email={watch("email")} /> : <>
                                <Typography variant="body1" sx={{ color: "gray", textAlign: "center" }}>
                                    Sign up to see photos and videos<br />from your friends
                                </Typography>

                                {/* Social Login */}
                                <Button
                                    variant="outlined"
                                    sx={{ color: 'white', backgroundColor: "#8b9ff0", fontSize: 15 }}
                                    fullWidth
                                    startIcon={<FacebookIcon />}
                                >
                                    Log in with Facebook
                                </Button>
                                <Divider>or</Divider>

                                {/* Email */}

                                <form onSubmit={(e) => {
                                    e.preventDefault();          // stop query params
                                    handleSubmit(handleSignup)(e);
                                }}>
                                    <Tooltip title="Please fill this field" followCursor>
                                        <Paper sx={{ p: '3px 4px', display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <InputBase
                                                sx={{ ml: 1, flex: 1 }}
                                                placeholder="Mobile Number or Email"
                                                {...register("email")}

                                            />
                                        </Paper>
                                    </Tooltip>
                                    {/* Password */}
                                    <Tooltip title="Please fill this field" followCursor>
                                        <Paper sx={{ p: '3px 4px', display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <div>
                                                <InputBase
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="Password"
                                                    type={showPassword ? "text" : "password"}
                                                    {...register('password', {
                                                        required: "password is required",
                                                        minLength: {
                                                            value: 6,
                                                            message: 'password at least 6 digits'
                                                        },
                                                        // pattern: { value: /^[A-Za-z]+$/i, message: 'only letters and number allowed' }
                                                    })}
                                                />
                                                {errors.password && <Typography sx={{ color: "red" }}>invalid password</Typography>}
                                            </div>
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                                aria-label={showPassword ? "hide password" : "show password"}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </Paper>
                                    </Tooltip>
                                    {errors.email && (
                                        <Typography sx={{ color: "red", mt: 1 }}>
                                            {errors.email.message}
                                        </Typography>
                                    )}
                                    {/* Full Name */}
                                    <Tooltip title="Please fill this field" followCursor>
                                        <Paper sx={{ p: '3px 4px', display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <InputBase
                                                sx={{ ml: 1, flex: 1 }}
                                                placeholder="Full Name"
                                                type="text"
                                                {...register("fullName", {
                                                    required: true,
                                                    minLength: 5
                                                })}
                                            />
                                        </Paper>
                                    </Tooltip>
                                    {errors.fullNamew && (
                                        <Typography sx={{ color: "red", mt: 1 }}>
                                            {errors.fullName.message}
                                        </Typography>
                                    )}
                                    {/* Username */}
                                    <Tooltip title="Please fill this field" followCursor>
                                        <Paper sx={{ p: '3px 4px', display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <InputBase
                                                sx={{ ml: 1, flex: 1 }}
                                                placeholder="Username"
                                                type="text"
                                                {...register('username')}
                                            />
                                        </Paper>
                                    </Tooltip>
                                    {errors.username && (
                                        <Typography sx={{ color: "red", mt: 1 }}>
                                            {errors.username.message}
                                        </Typography>
                                    )}
                                    <br />
                                    {/*date and time*/}
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <Controller
                                            name="dateOfBirth"
                                            control={control}
                                            rules={{ required: "Date of birth is required" }}
                                            render={({ field, fieldState }) => (
                                                <DatePicker
                                                    label=" Date of Birth"
                                                    value={field.value || null}
                                                    onChange={(newValue) => field.onChange(newValue)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={!!fieldState.error}
                                                            helperText={fieldState.error?.message}
                                                            fullWidth
                                                            sx={{ mt: 1 }}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                    <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
                                        By signing up, you agree to our{" "}
                                        <Link href="/terms" underline="hover" sx={{ color: "primary" }}>
                                            Terms ,
                                        </Link>
                                        {" "}
                                        <Link href="/privacy" underline="hover" sx={{ color: "primary" }}>
                                            Privacy Policy
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/cookies" underline="hover" sx={{ color: "primary" }}>
                                            Cookies Policy
                                        </Link>
                                    </Typography>
                                    {/* Signup Button */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type='submit'
                                        disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"}
                                    >
                                        Sign up
                                    </Button>
                                </form>
                            </>
                        }
                    </Stack>
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
                                href="/login"
                                underline="hover"
                                sx={{ color: "#506febff" }}
                            >
                                Login
                            </Link>
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}
