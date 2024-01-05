import { ArrowLeftCircleIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
    <div className="text-white flex flex-col text-center items-center justify-center h-screen">
      <div className="mb-10">
          <p className="text-center text-xl text-white font-medium">
            Click New Chat!
          </p>
          <ArrowLeftCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />{" "}
        </div>
      <div className=" bg-white rounded-full w-20 h-20 mb-4 items-center justify-center flex">
        <Image src="/chatgpt-logo.png" alt="logo" width={52} height={52} />
      </div>
      <h1 className="text-2xl font-bold mb-20">How can I help you today</h1>

      <div className=" flex flex-col md:flex-row md:space-x-2 lg:space-x-4 p-5">
        <div className="flex flex-col hover:border p-4 rounded-lg shadow-sm shadow-[#ffffff] hover:border-gray-100 transition duration-300 w-80 mb-3">
          <p className="text-base font-medium">Write email</p>
          <span className="text-gray-400 text-sm">
            requesting deadline extension for my project
          </span>
        </div>
        <div className="flex flex-col hover:border rounded-lg p-4 shadow-sm shadow-[#ffffff] hover:border-gray-100 transition duration-300 w-80 mb-3">
          <p className="text-base font-medium">Recommended activities</p>
          <span className="text-gray-400 text-sm">
            for team building day with remote employees
          </span>
        </div>
        <div className="flex flex-col hover:border rounded-lg p-4 shadow-sm shadow-[#ffffff] hover:border-gray-100 transition duration-300 w-80 mb-3">
          <p className="text-base font-medium">Give me ideas</p>
          <span className="text-gray-400 text-sm">
            for what to do with my kids's art
          </span>
        </div>
      </div>
    </div>
    </div>
  );
}
