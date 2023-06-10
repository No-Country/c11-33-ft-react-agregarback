import Image from "next/image";
import Link from "next/link";
import React from "react";
import img from "../../public/assets/no-auth.gif";

const NotLoggedInMessage: React.FC = () => {
  return (
    <div className="z-10 min-h-screen items-center justify-center rounded-lg border-gray-300 p-4">
      <Image
        src={img}
        width={500}
        height={500}
        alt="Not auth"
        className="my-3 rounded-md"
        placeholder="blur"
      />
      <p className="text-center text-lg font-medium text-white">
        You are not logged in
      </p>
      <div className="mt-4 flex justify-between">
        <Link href={"/"}>
          <button className="ml-4 rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
            Home
          </button>
        </Link>

        <Link href={"/api/auth/signin"}>
          <button className="rounded bg-black/70 px-4 py-2 text-white hover:bg-black hover:text-white">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotLoggedInMessage;
