"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { toggleTheme } from "../../redux/uiSlice";

export default function DevTest() {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.ui.theme);
  return (
    <Box sx={{ p: 4 }}>
      <Typography>Current theme: {theme}</Typography>
      <Button onClick={() => dispatch(toggleTheme())}>Toggle Theme</Button>
    </Box>
  );
}
