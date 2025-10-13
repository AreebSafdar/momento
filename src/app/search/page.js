"use client";
import React, { useState } from "react";
import {
    Stack,
    Typography,
    Avatar,
    Box,
    InputBase,
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
function Sidebar() {
    // Dummy avatar
    const person = { avatar: "/avatar.png" };



    const [search, setSearch] = useState("");



    return (
        <Stack sx={{ margin: 0, fontFamily: "Lato, sans-serif", ml: 8 }}>
            {/* Sidebar */}
            <Stack
                sx={{
                    width: 300,
                    backgroundColor: "white",
                    position: "fixed",
                    height: "100%",
                    overflow: "auto",
                    p: 2,
                    boxShadow: 3,
                }}
            >
                {/*header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 1 }}>
                    <Typography variant="h6" sx={{ fontSize: 20 }}>
                        <b>Search</b>
                    </Typography>
                </Box>
                {/* Search bar */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 4,
                        px: 1,
                        py: 0.5,
                        backgroundColor: '#f1f1f1',
                        borderRadius: 2,
                    }}
                >
                    <InputBase
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                    < CancelIcon sx={{ color: "gray", fontSize: 15 }} />

                </Box>
                <br />
                <hr />
                {/* Messages header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                    <Typography variant="body1" sx={{ fontSize: 14 }}>
                        <b>Recent</b>
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 22, ml: 11 }}>
                    <Typography variant="body1" sx={{ fontSize: 13, color: 'gray', }}>
                        No recent searches
                    </Typography>
                   
                </Box>
            </Stack>
        </Stack>
    );
}

export default Sidebar;

