"use client";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");

  const model = "text-davinci-003";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: user?.id!,
        name: user?.fullName!,
        avatar:
          user?.imageUrl! ||
          `https:/ui-avatars.com/api/?name=${user?.fullName}`,
      },
    };
    await addDoc(
      collection(db, "users", user?.id!, "chats", chatId, "messages"),
      message
    );

    const notification = toast.loading("ChatGpt is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        user,
      }),
    }).then(() => {
      toast.success("ChatGpt has responded!", {
        id: notification,
      });
    });
  };
  return (
    <div className="relative">
      <form className="p-5 space-x-2 flex" onSubmit={sendMessage}>
        <Input
          placeholder="Message ChatGpt"
          className="bg-transparent rounded-xl h-[52px] text-base text-white focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!user}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          disabled={!prompt || !user}
          className="absolute top-7 right-7 h-9 w-12 rounded-lg bg-gray-700"
        >
          <ArrowUp className="w-10" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
