import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import NotLoggedInMessage from "@/components/auth/NotLoggedInMessage";


export default async function DashboardLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
  return (
    <>
      {session ? children : <NotLoggedInMessage />}
    </>
  );
}