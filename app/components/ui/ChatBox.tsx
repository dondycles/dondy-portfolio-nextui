"use client";
import { useChatState } from "@/store";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineSend } from "react-icons/ai";
import { FieldValues, useForm } from "react-hook-form";
import { firestore } from "@/firebase";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export default function ChatBox() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
  } = useForm();
  const chat = useChatState();
  const date = new Date();
  const commentsScrollable = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState<DocumentData>([]);
  const comment = async (data: FieldValues) => {
    if (data.comment.trim() === "") {
      setValue("comment", null);
      setError("comment", {
        type: "required",
        message: "An empty comment is not valid.",
      });
      return;
    }
    try {
      await addDoc(collection(firestore, "comments"), {
        localId: chat.localId,
        comment: data.comment,
        name: data.name,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    commentsScrollable.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    reset();
  };
  const getComments = () => {
    onSnapshot(
      query(
        collection(firestore, "comments"),
        orderBy("createdAt", "asc"),
        limitToLast(10)
      ),
      (data) => {
        setComments(data.docs.map((comment) => comment.data()));
      }
    );
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        chat.toggleChat(false);
      }}
      className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black/10 flex backdrop-brightness-50 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="max-h-[70dvh] max-w-[500px] w-screen h-screen bg-background m-auto rounded-2xl py-4 flex flex-col gap-4"
      >
        <header className="text-center px-4">
          <h1 className="text-primary font-black text-xl ">
            Suggest or comment here.
          </h1>{" "}
          <p>Your inputs here are visible publicly.</p>
        </header>
        <div className="flex-1 h-full self-stretch   max-h-full overflow-y-auto overflow-x-hidden  rounded-xl px-4">
          <motion.div ref={commentsScrollable} className="flex flex-col gap-4 ">
            <AnimatePresence initial={false}>
              {comments.map((comment: DocumentData, i: number) => {
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring" }}
                    key={i}
                    className={`rounded-xl bg-primary/10 p-4 ${
                      comment.localId === chat.localId &&
                      "border-1 border-primary"
                    }`}
                  >
                    <p className="text-xs text-primary italic">
                      {comment.name.trim() === "" ? "Anonymous" : comment.name}{" "}
                      {comment.localId === chat.localId && "(You) "}
                      {comment.createdAt.toDate().toLocaleDateString()}
                    </p>
                    <p>{comment.comment}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        <form
          onSubmit={handleSubmit(comment)}
          className="flex flex-col w-full px-4 gap-4"
        >
          <Input
            autoFocus
            {...register("name")}
            variant="bordered"
            placeholder={"Name (Optional)"}
            className="flex-1"
          />
          <div className="flex flex-row gap-4">
            <Input
              autoFocus
              {...register("comment", {
                required: "A comment must not be empty.",
              })}
              variant="bordered"
              placeholder={
                errors.comment
                  ? `${errors.comment.message}`
                  : "Comments/Suggestions"
              }
              className="flex-1"
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="solid"
              color="primary"
              isIconOnly
              className="text-xl aspect-square font-black text-white"
            >
              <AiOutlineSend />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
