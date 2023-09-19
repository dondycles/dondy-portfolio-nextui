"use client";
import { useChatState, useThemeState } from "@/store";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineSend } from "react-icons/ai";
import { FieldValues, useForm } from "react-hook-form";
import { firestore } from "@/firebase";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  limitToLast,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export default function ChatBox() {
  const date = new Date();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
  } = useForm();
  const chat = useChatState();
  const theme = useThemeState();
  const commentsScrollable = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [modification, setModification] = useState({
    type: "",
    idToModify: "",
    currentComment: "",
    newComment: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const comment = async (data: FieldValues) => {
    if (!chat.name) {
      if (data.name.trim() !== "") chat.setName(data.name);
    }
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
        name: chat.name ? chat.name : data.name,
        createdAt: date.toLocaleDateString(),
        dateNow: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }

    reset();

    setTimeout(() => {
      commentsScrollable.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 500);
  };

  const deleteComment = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "comments", String(id)));
    } catch (error) {
      console.log(error);
    }
  };
  const editComment = async (id: string, newComment: string) => {
    try {
      await updateDoc(doc(firestore, "comments", String(id)), {
        comment: newComment,
      });
    } catch (error) {}
  };
  const getComments = () => {
    const get = onSnapshot(
      query(
        collection(firestore, "comments"),
        orderBy("dateNow", "asc"),
        limitToLast(10)
      ),
      (data) => {
        setComments(
          data.docs.map((comment) => ({
            id: comment.id,
            ...comment.data(),
          }))
        );
      }
    );

    return get;
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
      className={`fixed top-0 left-0 bottom-0 right-0 z-10 bg-black/10 flex backdrop-brightness-50 backdrop-blur-sm p-4`}
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
              {comments.map((comment: DocumentData) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, translateY: 40 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: 0 }}
                    key={comment.id}
                  >
                    {comment.localId === chat.localId ? (
                      <Dropdown
                        placement="top-end"
                        showArrow
                        className={`${theme.mode} text-foreground min-w-[100px]`}
                      >
                        <DropdownTrigger>
                          <Button
                            as={"div"}
                            className="rounded-xl py-8 px-4 bg-primary/10 border-1 border-primary flex flex-col items-start gap-0"
                          >
                            <p className="text-xs text-primary italic">
                              {comment.name?.trim() === ""
                                ? "Anonymous"
                                : comment.name}{" "}
                              {comment.localId === chat.localId && "(You) "}
                              {comment.createdAt}
                            </p>
                            <p>{comment.comment}</p>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          variant="solid"
                          closeOnSelect
                          aria-label="Actions"
                          className="flex gap-2"
                        >
                          <DropdownItem
                            onPress={onOpen}
                            onClick={() =>
                              setModification({
                                ...modification,
                                type: "Delete",
                                idToModify: comment.id,
                                currentComment: comment.comment,
                              })
                            }
                            color="danger"
                            className="bg-danger text-white"
                            key={"delete"}
                          >
                            Delete
                          </DropdownItem>
                          <DropdownItem
                            color="warning"
                            onPress={onOpen}
                            onClick={() =>
                              setModification({
                                ...modification,
                                type: "Edit",
                                idToModify: comment.id,
                                currentComment: comment.comment,
                              })
                            }
                            className="bg-warning text-white hover:text-white"
                            key={"edit"}
                          >
                            <p className="text-white">Edit</p>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    ) : (
                      <div
                        key={"div" + comment.id}
                        className={`rounded-xl bg-primary/10 p-4 flex flex-col`}
                      >
                        <p className="text-xs text-primary italic">
                          {comment.name?.trim() === ""
                            ? "Anonymous"
                            : comment.name}{" "}
                          {comment.localId === chat.localId && "(You) "}
                          {comment.createdAt}
                        </p>
                        <p>{comment.comment}</p>
                      </div>
                    )}
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
          {!chat.name && (
            <Input
              {...register("name")}
              variant="bordered"
              placeholder={"Name (Optional)"}
              className="flex-1"
            />
          )}

          <div className="flex flex-row gap-4">
            <Input
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
      <Modal
        isOpen={isOpen}
        placement={"bottom-center"}
        onOpenChange={onOpenChange}
        onClick={(e) => e.stopPropagation()}
        className={`bg-background text-foreground border-1 border-primary ${theme.mode}`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary">
                {modification.type} Comment?
              </ModalHeader>
              <form>
                <ModalBody>
                  {modification.type === "Delete" ? (
                    <p>Deleting can't be undone.</p>
                  ) : (
                    <Input
                      variant="bordered"
                      placeholder={modification.currentComment}
                      value={modification.newComment}
                      onChange={(e) =>
                        setModification({
                          ...modification,
                          newComment: e.target.value,
                        })
                      }
                    />
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color={
                      modification.type === "Delete" ? "danger" : "warning"
                    }
                    onPress={onClose}
                    onClick={() => {
                      if (modification.type === "Delete") {
                        deleteComment(modification.idToModify);
                      } else {
                        editComment(
                          modification.idToModify,
                          modification.newComment
                        );
                      }
                    }}
                  >
                    {modification.type}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.div>
  );
}
