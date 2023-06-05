import Dashboard from "@/components/profile/dashboard";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="z-10 bg-primary-400 p-6 text-neutral-100">
      <div className="container  px-4">
        <div className="flex flex-row gap-3 py-3">
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
            <p className="text-accent-600">Username</p>
            <span>1 workout</span>
          </div>
        </div>
        <div>
          <h1 className="py-5 uppercase">Dashboard</h1>
          <div className=" flex w-full flex-col content-center gap-5 md:flex-row md:flex-wrap md:justify-start lg:justify-center">
            <div className="flex w-full justify-center md:h-60 md:w-[450px] lg:w-[550px]">
              <Dashboard />
            </div>
            <div className="flex w-full justify-center md:h-60 md:w-[450px]  lg:w-[550px]">
              <Dashboard />
            </div>
            <div className="flex w-full justify-center md:h-60 md:w-[450px]  lg:w-[550px]">
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
