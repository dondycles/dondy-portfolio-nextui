import { Avatar } from "@nextui-org/avatar";

import SkillsTable from "./components/home/SkilsTable";
import { Divider } from "@nextui-org/divider";
export default function Home() {
  return (
    <>
      <header className="flex flex-row gap-4 justify-center items-center">
        <Avatar
          className="w-24 h-auto aspect-square "
          src="/images/avatars/me.jpg"
          alt="Graduation Pic"
        />
        <div>
          <h1 className="font-black text-primary text-base">
            John Rod Dondoyano
          </h1>
          <p>Web Developer | Pianist</p>
        </div>
      </header>
      <Divider />
      <div className="flex flex-col gap-4 indent-4">
        <p>
          I am a self-taught web developer who pulls up an all-nighter, holds a
          bachelor's degree in computer engineering. I split my time between
          music and exploring the world of web development. In fact, I achieved
          millions of views with my piano covers on YouTube.
        </p>
        <p>
          I really enjoy developing and designing websites! Learning web
          development is hard at first but later on I managed to enhance my
          knowledge about HTML, CSS, and JavaScript from YouTube tutorials and
          online lessons.
        </p>
      </div>
      <SkillsTable />
      <footer></footer>
    </>
  );
}
