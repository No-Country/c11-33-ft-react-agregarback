import Link from "next/link";
import React from "react";

const NotLoggedInMessage: React.FC = () => {
  return (
    <div className="z-50 rounded-lg border border-gray-300 p-4">
      <p className="text-lg font-medium">You are not logged in</p>
      <div className="mt-4 flex justify-between">
        <Link href={"/auth/signin"}>
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link href={"/"}>
          <button className="ml-4 rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotLoggedInMessage;
