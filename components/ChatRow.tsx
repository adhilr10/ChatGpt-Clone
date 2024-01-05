import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { MessageSquareShare, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  id: string;
};

const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const [messages] = useCollection(
    collection(db, "user", user?.id!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", user?.id!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow ${active && "bg-gray-700/50"}`}
    >
      <MessageSquareShare className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "NewChat"}
      </p>
      <Trash2
        onClick={removeChat}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
};

export default ChatRow;
