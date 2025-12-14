"use client";

import React, { useState, useRef } from "react";
import axios from "../axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  InputBase,
  Divider,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export default function CreateReelDialog({ open, handleClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [caption, setCaption] = useState("");
  const inputRef = useRef(null);

  // File Handling
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleOpenFileDialog = () => inputRef.current?.click();

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // Hashtag Extraction Helper
  const extractHashtags = (text) => {
    const matches = text.match(/#\w+/g);
    return matches ? matches.map((tag) => tag.substring(1)) : [];
  };

  // Create Post API
  const handleCreatePost = async () => {
    if (!selectedFile) {
      alert("Please select a media file first.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated!");
        return;
      }
      const hashtags = extractHashtags(caption);

      const formData = new FormData();
      formData.append("caption", caption.trim());
      formData.append("type", "post");
      formData.append("allow_comments", true);
      formData.append("hide_likes_views_count", false);
      formData.append("media", selectedFile); 
      formData.append("hashtags", hashtags.toString())

      // Send to API
      const res = await axios.post("/api/post/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Post created successfully:", res.data);
//tell the profile page to refresh posts
      window.dispatchEvent(new Event("postCreated"));
      // Reset
      handleClose();
      setSelectedFile(null);
      setPreviewURL(null);
      setCaption("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  // Upload Selection View
  if (!previewURL) {
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
          Create new post
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Card sx={{ p: 2, width: "100%" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <PlayArrowIcon sx={{ mt: 2, fontSize: 100, color: "black" }} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Drag photos and videos here
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={handleFileSelect}
          />
          <Button variant="contained" onClick={handleOpenFileDialog}>
            Select From Computer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return (
    <StyledDialog open={open} onClose={handleClose}>
      {/* Left Side: Media Preview */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selectedFile.type.startsWith("image/") ? (
          <img
            src={previewURL}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: "#000",
            }}
          />
        ) : (
          <video
            src={previewURL}
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: "#000",
            }}
          />
        )}
      </Box>

      {/* Right Side: Caption & Options */}
      <RightPanel>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            New post
          </Typography>
          <Box>
            <Button
              variant="text"
              sx={{
                color: "#0095f6",
                textTransform: "none",
                fontWeight: 600,
                mr: 1,
              }}
              onClick={handleCreatePost}
            >
              Share
            </Button>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Caption */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
          <Avatar src="/profile.jpg" alt="User" />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
             areeb
            </Typography>
            <CaptionInput
              placeholder="Write a caption..."
              multiline
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "right",
                mt: 1.5,
                color: "#999",
              }}
            >
              {caption.length}/2200
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />
        <OptionRow
          icon={<LocationOnOutlinedIcon fontSize="small" />}
          text="Add location"
        />
        <OptionRow
          icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
          text="Add collaborators"
        />
        <Divider sx={{ my: 1 }} />
        <ExpandableRow text="Share to" />
        <ExpandableRow text="Accessibility" />
        <ExpandableRow text="Advanced settings" />
        <Box sx={{ height: 30 }} />
      </RightPanel>
    </StyledDialog>
  );
}

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: 1000,
    height: "85vh",
    display: "flex",
    flexDirection: "row",
    borderRadius: "16px",
    overflow: "hidden",
  },
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  padding: theme.spacing(2.5),
}));

const CaptionInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  minHeight: 100,
  fontSize: 14,
  padding: theme.spacing(1),
  border: "1px solid #ddd",
  borderRadius: 8,
  "& textarea": {
    resize: "none",
  },
}));

const OptionRow = ({ icon, text }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      py: 1,
      px: 1,
      cursor: "pointer",
      "&:hover": { backgroundColor: "#fafafa" },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      <Typography variant="body2">{text}</Typography>
    </Box>
  </Box>
);

const ExpandableRow = ({ text }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      py: 1,
      px: 1,
      cursor: "pointer",
      "&:hover": { backgroundColor: "#fafafa" },
    }}
  >
    <Typography variant="body2">{text}</Typography>
    <ExpandMoreIcon fontSize="small" sx={{ color: "#888" }} />
  </Box>
);
