"use client";

import React, { useEffect, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
}

export default function Testing() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching user data...");
      try {
        const response = await fetch("/api/user/getUserBySession");
        console.log("Response:", response);
        const data: UserData = await response.json();
        console.log("Data:", data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {userData ? (
        <div>
          <h1>User Data</h1>
          <p>User ID: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user data as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
