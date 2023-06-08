import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotLoggedInMessage from "@/components/auth/NotLoggedInMessage";
import Footer from "@/components/layout/footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return <>{session != null ? <>{children}</> : <NotLoggedInMessage />}</>;
}
