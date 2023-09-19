import { Card, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
export default function Projects() {
  const projects = [
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
      name: "Moneyger",
      description:
        "Web application you can use for managing and keeping track of your personal money.",
      img: "/images/projects/moneyger.jpg",
      href: "https://moneyger-v2.vercel.app/",
      badges: ["NextJS", "Tailwind", "Firebase", "TypeScript"],
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
    <>
      {projects.map((project) => {
        return (
          <Card
            shadow="md"
            className="w-full min-h-[400px] col-span-12 sm:col-span-7 relative"
          >
            <Image
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover rounded-2xl"
              src={project.img}
              fill
            />
            <CardFooter className="absolute bg-background bottom-0 z-10 flex flex-row items-end text-foreground">
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
                          variant="solid"
                          className=" text-sizing bg-primary text-white"
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
                radius="full"
                variant="solid"
                color="primary"
                className="text-white"
              >
                Visit
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}
