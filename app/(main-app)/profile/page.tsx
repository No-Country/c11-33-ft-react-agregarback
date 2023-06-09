import ListDashboards from "@/components/profile/ListDashboards";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
interface Session {
  user: {
    id: number;
    name: string;
    email: string;
    image: string;
  };
}

export default async function Profile() {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <div className="z-10 h-auto w-full bg-primary-400 p-6 text-neutral-100">
      <div className="container  w-full px-4">
        <div className="flex w-full flex-row gap-3 py-3">
          <div className="w-[50px] rounded-full">
            <Image
              src="https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789.png"
              alt="Image Profile"
              width={120}
              height={30}
              unoptimized
            />
          </div>
          <div>
            <p className="capitalize text-accent-600">
              {session && session.user.email.split("@")[0]}
            </p>
            {/* {routines.data && routines.data.length >= 1 ? (
              <span>{routines.data[routines.data.length - 1].id} workout</span>
            ) : (
              <span>0 workout</span>
            )} */}
          </div>
        </div>
        <div className="w-full h-auto">
          <h1 className="py-5 uppercase">Dashboard</h1>
          <div className=" flex w-full flex-col flex-wrap content-center gap-5 md:flex-row md:flex-wrap md:justify-start lg:justify-center">
            {/* {routines.data && routines.data.length >= 1 ? (
              <ListDashboards />
            ) : (
              <p>Don´t have any workout!</p>
            )} */}
            <ListDashboards />
          </div>
        </div>
      </div>
    </div>
  );
}
