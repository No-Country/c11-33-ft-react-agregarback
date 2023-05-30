"use client";

import { useSession, getSession } from "next-auth/react";

export default function FormCreation() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  const userId = session.user?.id || session.user?.sub;

  console.log("user", session);
  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
    </>
  );
}
