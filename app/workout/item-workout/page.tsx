import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import Link from "next/link";
import RoutineComponent from "./RoutineComponent";

export default async function StartWorkout() {
  return (
    <div className="z-10 flex min-h-screen w-full flex-col items-center justify-center py-32">
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <RoutineComponent/>
      </div>
    </div>
  );
}
