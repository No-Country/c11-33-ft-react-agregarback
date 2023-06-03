"use client";

import { getCsrfToken, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
}

export const useUserData = (): [UserData | null, boolean] => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching user data...");
      try {
        const response = await fetch("/api/user/getUserBySession");
        console.log("Response:", response);
        const data: UserData = await response.json();
        const csrfToken = await getCsrfToken();
        console.log('Token', csrfToken);
        console.log("Data:", data);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [userData, loading,];
};

export default useUserData
