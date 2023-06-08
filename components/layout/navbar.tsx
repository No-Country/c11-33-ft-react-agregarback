"use client";
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import BarbellSVG from "../shared/icons/barbell";
import { LogOut, User, History } from "lucide-react";
import { signOut } from "next-auth/react";

import img from "public/icons/workout.svg";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full bg-primary-400 ${
          scrolled
            ? "border-b border-gray-200 backdrop-blur-xl"
            : "border-primary-400"
        } z-30 transition-all`}
      >
        <div className="flex h-16 max-w-screen-xl items-center justify-between bg-primary-400 px-5 xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <p className="font-display text-accent-600">FitTrackr</p>
          </Link>
          <div className="md:hidden">
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>

          <div className="hidden text-neutral-100 md:flex md:gap-2">
            {session ? (
              <>
                <ul className="flex items-center gap-4">
                  <Link href={"/profile"}>
                    <li className="hover:font-bolder flex h-[23px] flex-row flex-wrap content-center justify-center gap-2 text-accent-600 transition-all hover:rounded hover:p-3 hover:text-neutral-100">
                      <span className="m-auto  font-semibold ">Profile</span>
                      <User className="my-auto h-[20px] w-[20px]" />
                    </li>
                  </Link>
                  <Link href={"/workout"}>
                    <li className="hover:font-bolder flex h-[23px] flex-row flex-wrap content-center justify-center gap-2 text-accent-600 transition-all hover:rounded hover:p-3 hover:text-neutral-100">
                      <span className="m-auto  font-semibold ">Workout</span>
                      <Image
                        alt="workout img"
                        priority
                        src={img}
                        width={20}
                        height={20}
                        className="my-auto"
                      />
                    </li>
                  </Link>
                  <Link href={"/exercises"}>
                    <li className="hover:font-bolder flex h-[23px] flex-row flex-wrap content-center justify-center gap-2 text-accent-600 transition-all hover:rounded hover:p-3 hover:text-neutral-100">
                      <span className="m-auto  font-semibold ">Exercises</span>
                      <BarbellSVG width={20} height={20} className="my-auto" />
                    </li>
                  </Link>

                  <li
                    onClick={() => signOut()}
                    className="hover:font-bolder flex h-[23px] cursor-pointer flex-row flex-wrap content-center justify-center gap-2 text-accent-600 transition-all hover:rounded hover:p-3 hover:text-neutral-100"
                  >
                    <span className="m-auto  font-semibold ">Logout</span>
                    <LogOut className="my-auto h-[20px] w-[20px]" />
                  </li>
                </ul>
              </>
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
