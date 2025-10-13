'use client';

import * as React from 'react';
import { useState } from 'react';
import {
    Button,
    Box,
    Stack,
    Typography,
    Tooltip,
    Paper,
    Link,
    InputBase,
} from '@mui/material';
import axios from '../axios';

export default function OTP({ email }) {
    const [Otp, setOtp] = useState('')

    const handleOtp = async () => {
        try {
            let payload = {
                code: Otp,
                email: email
            }
            const response = await axios.post("/api/user/verify-otp/",payload)
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <Box sx={{ minHeight: '50vh', backgroundColor: '#f5f5f5', p: 4 }}>
            <Stack spacing={2} sx={{ p: 2, borderRadius: 2 }}>
                <Stack>
                    <Typography variant="body1" sx={{ color: "black", textAlign: "center" }}>
                        Enter confirmation code
                    </Typography>
                    <Typography variant="body2">
                        Enter the configration code that we sent to .{" "}<br />
                        <Link href="/terms" underline="hover" sx={{ color: "primary" }}>
                            Resend code.
                        </Link>
                        {" "}
                    </Typography>
                    <Tooltip title="Enter code" followCursor>
                        <Paper sx={{ p: '3px 4px', display: 'flex', alignItems: 'center', mt: 3 }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Confirmation code"
                                value={Otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </Paper>
                    </Tooltip>
                    {/* Button */}
                    <Button
                        variant="contained"
                        sx={{ color: "white", backgroundColor: "#8b9ff0", mt: 2 }}
                        fullWidth
                        onClick={handleOtp}
                    >
                        Next
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ color: "#8b9ff0", backgroundColor: "white", mt: 1 }}
                    >
                        Go back
                    </Button>
                </Stack>
            </Stack>
            <Stack sx={{ p: 1, borderRadius: 1, mr: 7 }}>
                <Stack>
                    <Stack
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 2,
                            width: 230,
                            // margin: '0 auto',
                            boxShadow: 3,
                            p: 3,
                        }}
                    >
                        <Typography variant="body2" sx={{ color: "black", ml: 5 }}>
                            Have an account?{" "}<br />
                            <Link href="/term" underline="hover" sx={{ color: "#8b9ff0", ml: 4 }}>
                                Log in
                            </Link>
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

