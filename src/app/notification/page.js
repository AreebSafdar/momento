"use client";
import React, { useState } from "react";
import {
    Stack,
    Typography,
    Avatar,
    Box,
    InputBase,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import SearchIcon from "@mui/icons-material/Search";

function Sidebar() {
    // Dummy avatar
    const person = { avatar: "/avatar.png" };

    // Dummy users
    const users = [
        {
            name: "__navya_.___,engenesty413",
            status: " liked your reel .13h ago"
        },
        {
            name: "Sathi",
            status: " liked your reel .18h"
        },
        {
            name: "Hanim",
            status: " liked your reel .4h "
        },
        {
            name: "Zaniii",
            status: " liked your reel .8m "
        },
        {
            name: "SisAaasSs",
            status: " liked your reel .7m "
        },
        {
            name: "Shehr Bano",
            status: "Sher sent an attachment .id"
        },
        {
            name: "aqsajutt5179, iqra_jutt",
            status: " liked your reel .20m a"
        },
    ];

    const [search, setSearch] = useState("");

    //  search
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

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
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                    <Typography variant="h5">
                        <b>Notifications</b>
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                    <Typography variant="body1">
                        <b>New</b>
                    </Typography>
                </Box>
                {/* Profile avatar */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, ml: 1 }}>
                    <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
                    <Typography variant="h6" sx={{ color: "black", fontSize: 12 }}>
                        <b> __navya_.___,engenesty413</b> and others liked your reel. 2m
                    </Typography>
                </Box>
                <br/>
                <hr />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                    <Typography variant="body1">
                        <b>Today</b>
                    </Typography>

                </Box>

                {/* User list */}
                <Stack spacing={2} sx={{ mt: 2 }}>
                    {filteredUsers.map((user, index) => (
                        <Box
                            key={index}
                            sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                            <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
                            <Box>
                                <Typography variant="h6" sx={{ color: "black", fontSize: 14 }}>
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "gray", fontSize: 12 }}>
                                    {user.status}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
                <br/>
                <hr/>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                    <Typography variant="body1">
                        <b>Yesterday</b>
                    </Typography>
                </Box>
                {/* Profile avatar */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, ml: 1 }}>
                    <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
                    <Typography variant="h6" sx={{ color: "black", fontSize: 12 }}>
                        <b> __navya_.___,engenesty413</b> and others liked your reel. 2m
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                    <Typography variant="body1">
                        <b>This month</b>
                    </Typography>

                </Box>

                {/* User list */}
                <Stack spacing={2} sx={{ mt: 2 }}>
                    {filteredUsers.map((user, index) => (
                        <Box
                            key={index}
                            sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                            <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
                            <Box>
                                <Typography variant="h6" sx={{ color: "black", fontSize: 14 }}>
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "gray", fontSize: 12 }}>
                                    {user.status}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Sidebar;

