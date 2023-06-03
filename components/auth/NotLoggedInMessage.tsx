import Link from "next/link";
import React from "react";



const NotLoggedInMessage: React.FC = () => {

  return (
    <div className="p-4 z-50 border border-gray-300 rounded-lg">
      <p className="text-lg font-medium">You are not logged in</p>
      <div className="mt-4 flex justify-between">
        <Link href={'/login'}>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
          Login
        </button>
          </Link>
          <Link href={'/'}>
        <button
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 ml-4"
          >
          Home
        </button>
          </Link>
      </div>
    </div>
  );
};

export default NotLoggedInMessage;