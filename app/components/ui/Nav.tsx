"use client";
import { Button, ButtonGroup } from "@nextui-org/react";
import ThemeButton from "./ThemeButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { useChatState } from "@/store";
export default function Nav() {
  const pathname = usePathname();
  const chat = useChatState();
  const pages = [
    { href: "/", name: "HOME" },
    { href: "/projects", name: "PROJECTS" },
    { href: "/connect", name: "CONNECT" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 pt-8 flex justify-center gap-4 z-20">
      <Button
        onClick={() => {
          chat.toggleChat(!chat.isOpen);
        }}
        isIconOnly
        radius="full"
        color="default"
        variant="flat"
        className={` ${chat.isOpen ? "bg-primary text-white" : ""}`}
      >
        <BsFillChatSquareDotsFill />
      </Button>
      <ButtonGroup variant="flat">
        {pages.map((page) => {
          return (
            <Button
              key={page.name}
              as={Link}
              href={page.href}
              className={`text-xs font-black text-foreground last:rounded-r-full first:rounded-l-full ${
                pathname === page.href ? "bg-primary text-white" : ""
              }`}
            >
              {page.name}
            </Button>
          );
        })}
      </ButtonGroup>
      <ThemeButton />
    </nav>
  );
}
