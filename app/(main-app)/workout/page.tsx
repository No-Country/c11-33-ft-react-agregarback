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
    <div className="z-10 flex min-h-screen w-full flex-col items-center justify-center pt-2">
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer className="text-accent-600">Workout</Balancer>
        </h1>
        <Image
          className="mx-auto mt-2 w-full max-w-[180px] rounded md:col-start-1 md:row-start-1"
          src="/assets/hero.png"
          alt="hero-image"
          width={300}
          height={300}
        />
        <div className="text-white/70">
          <div className="flex items-center justify-center ">
            <Link
              href={"/exercises"}
              className="boder-2 font-bolder mt-3 justify-center rounded-3xl border-black bg-primary-500/50 px-5 py-2 text-center text-xs text-white duration-300 hover:border-green-600 hover:bg-gray-700 hover:text-green-300 lg:text-base"
            >
              START AN EMPTY WORKOUT
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Link
              href={"/workout/item-workout"}
              className="boder-2 font-bolder mt-3 justify-center rounded-3xl border-black bg-primary-500  px-5 py-2 text-center text-xs text-neutral-100 duration-300 hover:border-green-600 hover:bg-gray-700 hover:text-green-300 lg:text-base"
            >
              WORKOUT IN CURSE
            </Link>
          </div>
          <div className="mt-9 grid grid-cols-1 gap-9 sm:gap-0 2xl:grid-cols-3">
            <div>
              <div className="mb-3">
                <h2 className="mr-2 inline font-bold uppercase text-white/70">
                  MY TEMPLATES
                </h2>
                <span className="text-2xl text-white">+</span>
              </div>
              <div className="font-roboto w-40 text-xs">
                <p>You don’t have any custom templates yet.</p>
                <br />
                <p>Tap the ‘+’ button to create your first template!</p>
              </div>
            </div>

            <div className="font-roboto sm:col-start-3">
              <div className="mb-3">
                <h2 className="mr-2 inline font-bold uppercase text-white/70">
                  SAMPLE TEMPLATES
                </h2>
                <span className="text-2xl text-white">+</span>
              </div>
              <div className="rounded-md border border-black p-2">
                <p className="w-40 text-sm font-semibold">Strong 5x5</p>
                <p className="text-xs">5 x Squat (Barbell)</p>
                <p className="text-xs">5 x Bench press (Barbell)</p>
                <p className="text-xs">5 x Bent Over Row (Barbell)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
