// ThemeToggleButton.tsx
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTheme } from "../theme-context";

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Update the body's class to reflect the current theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <Button variant="outline-light" onClick={toggleTheme}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </Button>
  );
};

export default ThemeToggleButton;
