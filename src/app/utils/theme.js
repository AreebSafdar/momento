"use client";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function Toggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // assume you have a theme slice

  const [isDarkMode, setDarkMode] = useState(theme === "dark");

  const handleToggle = () => {
    const newMode = !isDarkMode;
    setDarkMode(newMode);
    const newTheme = newMode ? "dark" : "light";

    // Update Redux state
    dispatch({
      type: "UPDATE_THEME",
      payload: { theme: newTheme },
    });

    // Store in localStorage
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      dispatch({
        type: "UPDATE_THEME",
        payload: { theme: savedTheme },
      });
    }
  }, [dispatch]);

  const themeVariables = {
    light: {
      primaryColor: "#ffffff",
      secondaryColor: "#272727",
    },
    dark: {
      primaryColor: "#272727",
      secondaryColor: "#ffffff",
    },
  };

  const currentTheme = themeVariables[isDarkMode ? "dark" : "light"];

  return (
    <div
      style={{
        marginTop: "1rem",
        backgroundColor: currentTheme.primaryColor,
        color: currentTheme.secondaryColor,
        padding: "0.5rem",
        borderRadius: "8px",
        display: "inline-block",
      }}
    >
      {isDarkMode ? (
        <FaMoon size={24} onClick={handleToggle} style={{ cursor: "pointer" }} />
      ) : (
        <FaSun size={24} onClick={handleToggle} style={{ cursor: "pointer" }} />
      )}
    </div>
  );
}

export default Toggle;
