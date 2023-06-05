import Balancer from "react-wrap-balancer";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="z-10 flex min-h-screen w-full flex-col items-center justify-center py-32">
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Workout</Balancer>
        </h1>
        <div className="flex items-center justify-center">
          <Link
            href={"/workout/item-workout"}
            className="boder-2 mt-3 justify-center rounded-3xl border-black bg-black px-5 py-2 text-center text-xs text-white duration-300 hover:border-green-600 hover:bg-gray-700 hover:text-green-300 lg:text-base"
          >
            START AN EMPTY WORKOUT
          </Link>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-9 sm:gap-0 2xl:grid-cols-3">
          <div>
            <div className="mb-3">
              <h2 className="mr-2 inline uppercase text-black/80">
                MY TEMPLATES
              </h2>
              <span className="text-2xl text-black/90">+</span>
            </div>
            <div className="font-roboto w-40 text-xs">
              <p>You don’t have any custom templates yet.</p>
              <br />
              <p>Tap the ‘+’ button to create your first template!</p>
            </div>
          </div>

          <div className="font-roboto sm:col-start-3">
            <div className="mb-3">
              <h2 className="mr-2 inline uppercase text-black/80">
                SAMPLE TEMPLATES
              </h2>
              <span className="text-2xl text-black/90">+</span>
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
  );
}
