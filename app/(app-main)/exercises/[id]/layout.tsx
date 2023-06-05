import NavExercises from "@/components/exercises/nav";
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
      <section className="mb-20 hidden gap-20 md:grid md:px-28">
        <article>
          <h4 className="text-2xl font-semibold text-accent-600">ABOUT</h4>
          <About params={params} />
        </article>

        <article>
          <h4 className="mb-10 text-2xl font-semibold text-accent-600">
            HISTORY
          </h4>
          <History />
        </article>

        <article>
          <h4 className="mb-10 text-2xl font-semibold text-accent-600">
            RECORDS
          </h4>
          <Records />
        </article>
      </section>
    </div>
  );
}
