"use client";
import { NextUIProvider as Provider } from "@nextui-org/react";
import Nav from "../ui/Nav";
import { useThemeState } from "@/store";
import InnerLayout from "../ui/InnerLayout";
import { useEffect, useState } from "react";
import Footer from "../ui/Footer";

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeState();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <>
      {hydrated && (
        <Provider
          className={`max-h-[100dvh] h-screen w-full bg-background overflow-x-hidden overflow-y-auto pt-8 pb-4  text-foreground  font-roboto text-sizing ${theme.mode} `}
        >
          <Nav />
          <InnerLayout>{children}</InnerLayout>
        </Provider>
      )}
    </>
  );
}