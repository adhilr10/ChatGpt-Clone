"use client";

import { UserButton } from "@clerk/nextjs";
import NewChat from "./NewChat";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";

const Sidebar = () => {
  const { user } = useUser();
  const [chats, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <div className="flex flex-col p-2 h-screen">
      <div className="flex-1">
        <div>
          {user &&
          <NewChat />}
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white mt-4">
                <p>Loading Chats</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="space-x-2">
        <Button variant={"primary"}>
          <UserButton afterSignOutUrl="/sign-in" />
          <h2 className="font-bold text-base text-white">{user?.fullName}</h2>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
