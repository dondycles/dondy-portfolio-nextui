"use client";
import { useThemeState } from "@/store";
import { Switch } from "@nextui-org/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
export default function ThemeButton() {
  const theme = useThemeState();
  return (
    <Switch
      defaultSelected={theme.mode === "dark" ? true : false}
      onClick={() => {
        if (theme.mode === "dark") return theme.toggleMode("light");
        theme.toggleMode("dark");
      }}
      size="sm"
      color="primary"
      startContent={<MdDarkMode />}
      endContent={<MdLightMode />}
    />
  );
}
