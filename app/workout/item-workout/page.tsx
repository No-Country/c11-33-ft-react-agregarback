import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="z-10 flex w-full flex-col items-center justify-center py-32">
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <div className="grid gap-4 grid-cols-2">
          <Link href={'/workout/item-workout/add'} className="capitalize text-center bg-blue-400 py-2 px-3 duration-300 hover:bg-black hover:text-white">Add Exercises</Link>
          <Link href={'/workout'} className="text-center capitalize bg-red-400 py-2 px-3 duration-300 hover:bg-black hover:text-white">Cancel Workout</Link>
        </div>
      </div>
    </div>
  );
}
