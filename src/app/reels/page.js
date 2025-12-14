"use client";
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export default function ReelPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "#fff",
        minHeight: "90vh",
        py: 2,
        ml:80,
        width:450
            }}
    >
      {/* Main Reel Container */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        {/* Video Section */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#000",
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <video
            src="/sample.mp4" // replace with your video file
            autoPlay
            loop
            muted
            style={{
              width: "50%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Overlay text */}
          <Typography
            variant="body1"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "#fff",
              px: 1,
              borderRadius: 1,
              fontWeight: "bold",
            }}
          >
            Every family has that one nakhrebaaz who eats like this
      <Box sx={{ mt: 2, width: "100%", maxWidth: 300, mt: 57}}>
           <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src="/user.jpg" alt="user"/>
          <Typography variant="body1" fontWeight="bold">
            bhupinder_19
          </Typography>
          <Button variant="outlined" size="small">
            Follow
          </Button>
        </Stack>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Aur aise kon khata hai?... more
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <MusicNoteIcon fontSize="small" />
          <Typography variant="caption">One Direction · Night Changes</Typography>
        </Stack>
              </Box>
          </Typography>
        </Box>

        <Stack spacing={1} alignItems="center" justifyContent="flex-start" sx={{mt:45}}>
          <IconButton>
            <FavoriteBorderIcon fontSize="large"sx={{color:"black", fontSize:29 }} />
          </IconButton>
          <Typography variant="body2" sx={{color:"black"}} >917K</Typography>
          <IconButton>
            <ChatBubbleOutlineIcon fontSize="large"sx={{color:"black", fontSize:29}}  />
          </IconButton>
          <Typography variant="body2"sx={{color:"black"}} >13.1K</Typography>
          <IconButton>
            <SendIcon fontSize="large"sx={{color:"black", fontSize:29}}  />
          </IconButton>
          <IconButton>
            <MoreHorizIcon fontSize="large"sx={{color:"black", fontSize:29}}  />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
