'use client';

import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("edmonton-light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "edmonton-light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "edmonton-light" ? "edmonton-dark" : "edmonton-light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-secondary fixed top-4 right-4 z-50"
    >
      {theme === "edmonton-light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}
