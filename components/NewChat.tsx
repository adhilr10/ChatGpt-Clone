"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NewChat = () => {
  const { user } = useUser();
  const router = useRouter();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", user?.id!, "chats"), {
        userId: user?.id,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`)
  };
  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon height={15} width={15} />
      <p>New chat</p>
    </div>
  );
};

export default NewChat;
