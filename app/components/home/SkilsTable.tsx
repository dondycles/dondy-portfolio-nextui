"use client";

import {
  SiSvelte,
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
} from "react-icons/si";
import {
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
export default function SkillsTable() {
  const skillAndLevel = [
    { skill: "HTML", level: 90, icon: <SiHtml5 /> },
    { skill: "CSS", level: 90, icon: <SiCss3 /> },
    { skill: "TailwindCSS", level: 80, icon: <SiTailwindcss /> },
    { skill: "JS", level: 80, icon: <SiJavascript /> },
    { skill: "TS", level: 80, icon: <SiTypescript /> },
    { skill: "React", level: 80, icon: <SiReact /> },
    { skill: "NextJS", level: 80, icon: <SiNextdotjs /> },
    { skill: "SvelteKit", level: 80, icon: <SiSvelte /> },
    { skill: "Firebase", level: 80, icon: <SiFirebase /> },
  ];

  return (
    <Table fullWidth aria-label="Skills Level" className="text-center ">
      <TableHeader>
        <TableColumn className="text-center text-sizing">SKILL</TableColumn>
        <TableColumn className="text-center bg-primary w-1/2 text-sizing">
          LEVEL
        </TableColumn>
      </TableHeader>
      <TableBody>
        {skillAndLevel.map((skill, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="flex items-center gap-2 justify-center text-sizing">
                {" "}
                {skill.icon} {skill.skill}
              </TableCell>
              <TableCell>
                <Progress
                  size="md"
                  aria-label={skill.skill + "level"}
                  value={skill.level}
                  className="max-w-[300px] mx-auto"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
