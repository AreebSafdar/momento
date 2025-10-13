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

export default function OTP() {
    const [Otp, setOtp] = useState('')
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', p: 4 }}>
            <Stack spacing={2} sx={{ p: 2, borderRadius: 2 }}>
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
                            <Paper sx={{ p: '3px 4px', display: 'flex', alignItems: 'center' }}>
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
                            sx={{ color: "white", backgroundColor: "#8b9ff0" }}
                            fullWidth
                        >
                            Next
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ color: "#8b9ff0", backgroundColor: "white" }}
                        >
                            Go back
                        </Button>
                    </Stack>
                </Stack>
                {/*log in form */}
            </Stack>
            <Stack sx={{ p: 2, borderRadius: 2, mb: 12 }}>
                <Stack>
                    <Stack
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 2,
                            width: 380,
                            margin: '0 auto',
                            boxShadow: 3,
                            p: 3,
                        }}
                    >
                        <Typography variant="body2" sx={{ color: "black", ml: 12 }}>
                            Have an account?{" "}<br />
                            <Link href="/terms" underline="hover" sx={{ color: "#8b9ff0", ml: 6 }}>
                                Log in
                            </Link>
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

// 'use client';

// import * as React from 'react';
// import { useState } from 'react';
// import {
//     Button,
//     Box,
//     Stack,
//     Typography,
   
//     Link
// } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
// export default function SignupPage() {
//     return (
//         <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', p: 4 }}>
//             <Stack spacing={2} sx={{ p: 2, borderRadius: 2 }}>
//                 <Stack>
//                     <Stack
//                         spacing={3}
//                         sx={{
//                             backgroundColor: 'white',
//                             borderRadius: 2,
//                             maxWidth: 400,
//                             margin: '0 auto',
//                             p: 5,
//                             boxShadow: 3,
//                         }}
//                     >
//                         <Typography variant="h4" sx={{ color: "#f08be4", textAlign: "center" }}>
//                         <b>Momento</b>
//                         </Typography>
//                         <Typography variant="body1" sx={{ color: "black", textAlign: "center" }}>
//                             Add your date of birth<CakeOutlinedIcon/>
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: "gray" }}>
//                             This won't be part of your public profile.{" "}<br />
//                             <Link href="/terms" underline="hover" sx={{ color: "primary" }}>
//                                 Why do I need to provide my date of birth?
//                             </Link>
//                             {" "}
//                         </Typography>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker />
//                         </LocalizationProvider>
//                         {/* Social Login */}
//                         <Button
//                             variant="outlined"
//                             sx={{ color: 'white', backgroundColor: "#8b9ff0", fontSize: 15 }}
//                             fullWidth
//                             startIcon={<FacebookIcon/>}
//                         >
//                             Log in with Facebook
//                         </Button>
//                         <Typography variant="body2" sx={{ color: "gray", fontSize: 12, ml: 3 }}>
//                             You need to enter the date you were born on<br />
//                             <Link href="/terms" underline="hover" sx={{ color: "gray", marginTop: 3, fontSize: 12 }}>
//                                 Use your own date of birth, even if this account is for a <br />
//                                 business, pet or something else
//                             </Link>
//                         </Typography>
//                         {/* Signup Button */}
//                         <Button
//                             variant="contained"
//                             sx={{ color: "white", backgroundColor: "#f08be4" }}
//                             fullWidth
//                         >
//                             Next
//                         </Button>
//                         <Button
//                             variant="contained"
//                             fullWidth
//                             sx={{ color: "#f08be4", backgroundColor: "white" }}
//                         >
//                             Go back
//                         </Button>
//                     </Stack>
//                 </Stack>
//                 {/*log in form */}
//             </Stack>
//             <Stack sx={{ p: 2, borderRadius: 2, mb: 12 }}>
//                 <Stack>
//                     <Stack
//                         sx={{
//                             backgroundColor: 'white',
//                             borderRadius: 2,
//                             width: 380,
//                             margin: '0 auto',
//                             boxShadow: 3,
//                             p: 3,
//                         }}
//                     >
//                         <Typography variant="body2" sx={{ color: "black", ml: 12 }}>
//                             Have an account?{" "}<br />
//                             <Link href="/terms" underline="hover" sx={{ color: "#8b9ff0", ml: 6 }}>
//                                 Log in
//                             </Link>
//                         </Typography>
//                     </Stack>
//                 </Stack>
//             </Stack>
//         </Box>
//     );
// }