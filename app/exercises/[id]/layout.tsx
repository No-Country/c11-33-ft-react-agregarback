import NavExercises from "@/components/exercises/nav"
import { Suspense } from "react";

interface Params{
  id:number;
}

export default function LayoutExercises({
    children , params
  }: {
    children: React.ReactNode,
    params:Params
  }) {

    const {id} = params;

      return (
            <div className="z-10 w-full mx-4">
            {/* // <Suspense fallback="..."> */}
              <NavExercises id={id}/>
            {/* // </Suspense> */}
            <section className="flex min-h-screen w-full flex-col items-center justify-center py-5">
              {children}
            </section>
            </div>
      );

  }
  