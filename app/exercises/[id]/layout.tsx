import NavExercises from "@/components/exercises/nav";
import { Suspense } from "react";
import About from "./about/page";
import History from "./history/page";
import Records from "./records/page";

interface Params {
  id: number;
}

export default function LayoutExercises({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { id } = params;

  return (
    <div className="z-10 mx-4 w-full bg-primary-400 py-5">
      {/* // <Suspense fallback="..."> */}
      <NavExercises id={id} />
      {/* // </Suspense> */}
      <section className="flex min-h-screen w-full flex-col items-center justify-center py-5 md:hidden">
        {children}
      </section>
      <section className="hidden  md:block md:px-28">
        <h4 className="text-2xl font-semibold text-accent-600">ABOUT</h4>
        <About params={params} />
        <h4 className="text-2xl font-semibold text-accent-600">HISTORY</h4>
        <History />
        <h4 className="text-2xl font-semibold text-accent-600">RECORDS</h4>
        <Records />
      </section>
    </div>
  );
}
