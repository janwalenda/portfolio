"use client";
import { Icon } from "@iconify/react";
import { useThemeStore } from "@/store/theme";
import { useState, useEffect } from "react";

export default function HeaderThemeSwitch() {
  const { theme, setTheme } = useThemeStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
  };

  return (
    <label className="swap swap-rotate btn btn-ghost">
      <input
        type="checkbox"
        className="theme-controller"
        value="dark"
        checked={theme === "dark"}
        onChange={handleThemeChange}
      />
      <Icon icon="heroicons:sun" className="swap-off size-5 fill-current" />
      <Icon icon="heroicons:moon" className="swap-on size-5 fill-current" />
    </label>
  )
}