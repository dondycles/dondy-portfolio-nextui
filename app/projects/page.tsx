import Link from "next/link";
import Image from "next/image";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Metadata } from "next";
import { Card, CardFooter } from "@nextui-org/card";

export const metadata: Metadata = {
  title: "Projects | John Rod Dondoyano",
};
export default function Projects() {
  const projects = [
    {
      name: "HeroeZ! Heroes in 6th Dimension.",
      description: "Anime inspired website for showcasing an NFT Project.",
      img: "/images/projects/heroez.png",
      href: "https://heroezofficial.com/",
      badges: ["NextJS", "NextUI", "Zustand", "Tailwind", "TypeScript"],
    },
    {
      name: "Sveltered",
      description:
        "E-Commerce Website I created with the help of developedbyed's course.",
      img: "/images/projects/sveltered.jpg",
      href: "https://next-commerce-kousei.vercel.app/",
      badges: [
        "NextJS",
        "Stripe",
        "Prisma",
        "Next-Auth",
        "Zustand",
        "PostgreSQL",
        "Tailwind",
        "Daisy UI",
        "TypeScript",
      ],
    },
    {
      name: "Studio CXGNUS",
      description: "Anime inspired website for showcasing an NFT Project.",
      img: "/images/projects/cxgnus.jpg",
      href: "https://studiocxgnus-alpha.vercel.app/",
      badges: ["HTML", "CSS", "Vanilla JavaScript"],
    },
    {
      name: "Piano Website",
      description: "A light website to showcase my music career.",
      img: "/images/projects/pianowebsite.jpg",
      href: "https://johnrodxpianist.site",
      badges: ["SvelteKit", "Tailwind", "TypeScript", "Firebase", "EmailJS"],
    },
    {
      name: "Moneytor",
      description:
        "Web application you can use for managing and keeping track of your personal money.",
      img: "/images/projects/moneytor.png",
      href: "https://moneytor-ph.vercel.app",
      badges: ["NextJS", , "NextUI", "Tailwind", "Firebase", "TypeScript"],
    },
    {
      name: "Wheel Of Pearl",
      description: "Web application you can use to help you decide in life.",
      img: "/images/projects/wheelofpearl.jpg",
      href: "https://wheel-of-pearl.vercel.app/",
      badges: ["NextJS", "Tailwind", "TypeScript"],
    },
  ];
  return (
    <div className="grid lg:grid-cols-2  gap-4">
      {projects.map((project) => {
        return (
          <Card shadow="md" className=" min-h-[500px]">
            <Image
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover rounded-2xl"
              src={project.img}
              fill
            />
            <CardFooter className="absolute bg-background bottom-0 z-10 flex flex-col items-start text-foreground gap-4">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col gap-2">
                  <h1 className="font-black text-2xl text-primary">
                    {project.name}
                  </h1>
                  <p className="">{project.description}</p>
                  <div className=" flex flex-wrap gap-1">
                    {project.badges.map((chip) => {
                      return (
                        <Chip
                          variant="bordered"
                          color="primary"
                          className=" text-sizing bg-transparent text-foreground"
                        >
                          {chip}
                        </Chip>
                      );
                    })}
                  </div>
                </div>
              </div>
              <Button
                as={Link}
                href={project.href}
                target="_blank"
                variant="solid"
                color="primary"
                className="text-white w-full"
              >
                Visit
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
