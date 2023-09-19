import { Button } from "@nextui-org/button";
import Link from "next/link";
import {
  FaXTwitter,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";
export default function Footer() {
  const accounts = [
    {
      name: "Github",
      link: "https://github.com/dondycles",
      icon: <FaGithub />,
    },
    {
      name: "Facebook",
      link: "https://facebook.com/dondycles",
      icon: <FaFacebookF />,
    },
    { name: "Twitter", link: "https://x.com/dondycles", icon: <FaXTwitter /> },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/in/john-rod-dondoyano",
      icon: <FaLinkedin />,
    },
    {
      name: "YouTube",
      link: "https://youtube.com/johnroddondoyano",
      icon: <FaYoutube />,
    },
    {
      name: "Instagram",
      link: "https://instagram.com/dondycles",
      icon: <FaInstagram />,
    },
  ];
  return (
    <footer className="flex flex-row flex-wrap gap-2 justify-center mt-auto mb-0">
      {accounts.map((account) => {
        return (
          <Button
            isIconOnly
            radius="full"
            color="primary"
            variant="shadow"
            as={Link}
            href={account.link}
            target="_blank"
            className="text-xl text-white"
          >
            {account.icon}
          </Button>
        );
      })}
    </footer>
  );
}
