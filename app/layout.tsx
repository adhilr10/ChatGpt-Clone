import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/SideBar";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGpt",
  description: "ChatGpt Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex">
            <div className="bg-[#202123] max-w-xs h-screen md:min-w-[20rem] overflow-y-auto">
              <Sidebar />
            </div>

            <ClientProvider />

            <div className="flex-1 bg-[#343541]">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
