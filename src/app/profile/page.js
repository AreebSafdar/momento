"use client";
import React from "react";
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Grid, CustomTabPanel, Typography, Card, CardMedia, Tabs, Tab } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import GridViewIcon from '@mui/icons-material/GridView';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
export default function Page() {
    const posts = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        },
         {
            id: 3,
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        }, {
            id: 3,
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        }, {
            id: 3,
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        }, {
            id: 3,
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        }, {
            id: 3,
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        },
    ];
    const person = { avatar: "/avatar.png" };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ p: 3, maxWidth: 900, mx: "auto", ml: 62 }}>
            {/* Profile Header */}
            <Grid container spacing={3} alignItems="center">
                <Grid item>
                    <Avatar
                        src={person.avatar}
                        sx={{ width: 120, height: 120 }}
                    />
                </Grid>
                <Grid item xs>
                    <Box sx={{ mt: 1, display: "flex", gap: 2 }}>

                        <Typography variant="h6" sx={{ fontSize: 20 }}>
                            itz.adiiies
                        </Typography>
                        <Button variant="outlined" sx={{ mt: 1, fontSize: 12, backgroundColor: '#f1f1f1', color: 'black', border: 'none' }}>
                            Edit Profile
                        </Button>
                        <Button variant="outlined" sx={{ mt: 1, fontSize: 12, fontSize: 12, backgroundColor: '#f1f1f1', color: 'black', border: 'none' }}>
                            View Achive
                        </Button>
                        <SettingsIcon sx={{ mt: 1, fontSize: 33 }} />
                    </Box>
                    <Box sx={{ mt: 1, display: "flex", gap: 0 }}>
                        <Typography>98</Typography>
                        <Typography sx={{ color: 'gray' }}>Posts</Typography>
                        <Typography sx={{ ml: 3 }}>61</Typography>
                        <Typography sx={{ color: 'gray' }}>followers</Typography>
                        <Typography sx={{ ml: 3 }}>11</Typography>
                        <Typography sx={{ color: 'gray' }}>following</Typography>

                    </Box>
                    <Typography sx={{ mt: 2 }}>
                        <strong>Adiiies</strong> | Nationality: pk <br />
                        Forget your past, forgive yourself & being again
                    </Typography>
                </Grid>
            </Grid>

            {/* Posts Grid */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 8, ml: 9 }}>
                <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
                    <Tab icon={< GridViewIcon sx={{}} />} aria-label="grid" />
                    <Tab icon={<MovieFilterOutlinedIcon sx={{ ml: 19 }} />} aria-label="video" />
                    <Tab icon={<BookmarkBorderOutlinedIcon sx={{ ml: 19 }} />} aria-label="save" />
                    <Tab icon={<AssignmentIndOutlinedIcon sx={{ ml: 19 }} />} aria-label="person" />
                </Tabs>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={1}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={8} md={2} key={post.id}>
                            <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                                <CardMedia
                                    component="img"
                                    height="185"
                                    image={post.img}
                                    alt="Post"
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
