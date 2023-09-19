"use client";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/firebase";
import { Spinner } from "@nextui-org/react";

export default function Form() {
  const [messageValue, setMessageValue] = useState<string | null>();
  const [mail, setMail] = useState({ message: "", email: "" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm();
  const submit = async (data: FieldValues) => {
    if (data.message.length < 10) {
      setError("message", {
        type: "minLength",
        message: "Please input more than 10 characters.",
      });
      return;
    }
    try {
      await addDoc(collection(firestore, "mails"), {
        email: data.email,
        message: data.message,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-2 w-full max-w-[500px] mx-auto h-full"
    >
      <Input
        {...register("email", { required: "Please input your email." })}
        variant="bordered"
        key={"email"}
        type="email"
        label={"Email"}
        classNames={{ label: "text-foreground/50" }}
        labelPlacement={"inside"}
      />
      {errors.email && (
        <p className="text-danger">{String(errors.email.message)}</p>
      )}
      <Textarea
        {...register("message", {
          required: "A blank message is not valid.",
          minLength: {
            value: 10,
            message: "A message must be more than 10 characters.",
          },
        })}
        variant="bordered"
        labelPlacement="outside"
        placeholder={"Message"}
        onChange={(e) => setMail({ ...mail, message: e.target.value })}
      />
      {errors.message && (
        <p className="text-danger">{String(errors.message.message)}</p>
      )}
      <Button
        disabled={isSubmitting}
        variant="solid"
        color="primary"
        type="submit"
        className={`font-black text-xs text-white min-h-[3rem] disabled:bg-primary/50`}
      >
        {isSubmitting ? <Spinner size="sm" color="white" /> : "SEND"}
      </Button>
    </form>
  );
}
