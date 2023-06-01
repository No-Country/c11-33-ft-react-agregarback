"use client";
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import BarbellSVG from "../shared/icons/barbell"
import {
  LayoutDashboard,
  LogOut,
  User,
  History,
} from "lucide-react";

import { signOut } from "next-auth/react";

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
            <p className="text-accent-600 font-display">FitTrackr</p>
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
                <Link href={'/profile'} >
                  <li className="flex flex-row text-accent-600 content-center gap-2 justify-center h-[23px] flex-wrap hover:text-neutral-100 hover:p-3 hover:rounded hover:font-bolder transition-all">
                    <span className="m-auto  font-semibold ">Profile</span>
                    <User className="h-[20px] w-[20px] my-auto" />
                  </li>
                </Link>
                <Link href={'/workout'}>
                <li className="flex flex-row text-accent-600 content-center gap-2 justify-center h-[23px] flex-wrap hover:text-neutral-100 hover:p-3 hover:rounded hover:font-bolder transition-all">
                  <span className="m-auto  font-semibold ">Workout</span>
                  <Image
                  alt="workout img"
                  src="icons/workout.svg"
                  width={20}
                  height={20}
                  className="my-auto"
                />
                </li>
                </Link>
                <Link href={'/exercises'}>
                <li className="flex flex-row text-accent-600 content-center gap-2 justify-center h-[23px] flex-wrap hover:text-neutral-100 hover:p-3 hover:rounded hover:font-bolder transition-all">
                  <span className="m-auto  font-semibold ">Exercises</span>
                  <BarbellSVG
                  width={20}
                  height={20}
                  className="my-auto"
                />
                </li>
                </Link>
                <Link href={'/history'}>
                <li className="flex flex-row text-accent-600 content-center gap-2 justify-center h-[23px] flex-wrap hover:text-neutral-100 hover:p-3 hover:rounded hover:font-bolder transition-all">
                  <span className="m-auto  font-semibold ">History</span>
                  <History className="h-[20px] w-[20px] my-auto" />
                </li>
                </Link>
                <Link href={'/dashboard'}>
                <li className="flex flex-row text-accent-600 content-center gap-2 justify-center h-[23px] flex-wrap hover:text-neutral-100 hover:p-3 hover:rounded hover:font-bolder transition-all">
                  <span className="m-auto  font-semibold ">Dashboard</span>
                  <LayoutDashboard className="h-[20px] w-[20px] my-auto" />
                </li>
                </Link>
                
                <li 
                  onClick={()=>signOut()}
                className="flex flex-row text-accent-600 content-center gap-2 justify-center h-[23px] flex-wrap hover:text-neutral-100 hover:p-3 hover:rounded hover:font-bolder transition-all cursor-pointer">
                  <span className="m-auto  font-semibold ">Logout</span>
                  <LogOut className="h-[20px] w-[20px] my-auto" />
                </li>
                

              </ul>

              
              
             
              
              </>
            )
            
            :(
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
