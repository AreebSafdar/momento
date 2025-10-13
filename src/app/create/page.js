"use client";
import { Stack, Card, Typography, CardContent, Button, Box } from "@mui/material";
import React from "react";
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
export default function Page() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f9f9", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            <b>Create new post</b>
          </Typography>
          <hr />
          <VideoCameraBackOutlinedIcon sx={{ fontSize: 40, mt: 3, color: "black" }} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Drag photos and videos here
          </Typography>
          <Button variant="contained" sx={{ mt: 2, fontSize: 12 }}>
            Select From Computer
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

