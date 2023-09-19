"use client";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { FormEvent, useState } from "react";

export default function Form() {
  const [messageValue, setMessageValue] = useState<string | null>();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={(e) => submit(e)}
      className="flex flex-col gap-2 w-full max-w-[500px] mx-auto h-full"
    >
      <Input
        variant="bordered"
        key={"email"}
        type="email"
        label="Email"
        classNames={{ label: "text-foreground/50" }}
        labelPlacement={"inside"}
      />
      <Textarea
        variant="bordered"
        labelPlacement="outside"
        placeholder="Enter your message"
        value={messageValue || ""}
        onValueChange={setMessageValue}
      />
      <Button
        variant="solid"
        color="primary"
        type="submit"
        className="font-black text-xs text-white min-h-[3rem]"
      >
        SEND
      </Button>
    </form>
  );
}
