import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { Box, Typography } from "@mui/material";

const itemData = [
  { img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e", 
    title: "Breakfast", 
    likes: 120, 
    comments: 15 },
  { img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d", 
    title: "Burger",
     likes: 200,
      comments: 40 },
  { img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
     title: "Camera", 
     likes: 95, 
     comments: 10 },
  { img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
     title: "Coffee",
      likes: 300,
       comments: 55 },
        {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    title: "Coffee",
      likes: 300,
       comments: 55 
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  title: "Coffee",
      likes: 300,
       comments: 55 },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  title: "Coffee",
      likes: 300,
       comments: 55 },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  title: "Coffee",
      likes: 300,
       comments: 55 },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  title: "Coffee",
      likes: 300,
       comments: 55 },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  title: "Coffee",
      likes: 300,
       comments: 55 },
];

export default function HoverImageList() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 7, ml:30 }}>
      <ImageList sx={{ width: "100%", maxWidth: 900 }} cols={3} gap={6}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{ position: "relative", cursor: "pointer" }}>
            {/* Image */}
            <img
              src={`${item.img}?w=300&h=300&fit=crop&auto=format`}
              srcSet={`${item.img}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{ borderRadius: "12px", width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* Overlay (hidden until hover) */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                opacity: 0,
                transition: "opacity 0.3s ease",
                borderRadius: "12px",
                "&:hover": { opacity: 1 },
                gap: 2,
              }}
            >
              <Typography variant="body1"><FavoriteIcon/> {item.likes}</Typography>
              <Typography variant="body1"><CommentIcon/> {item.comments}</Typography>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
