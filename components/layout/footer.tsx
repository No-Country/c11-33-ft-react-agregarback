import Link from "next/link";
import { Facebook, Twitter } from "@/components/shared/icons/";
export default function Footer() {
  return (
    <div className="absolute  w-full border-gray-200 bg-primary-400 py-12  text-white">
      <div className="container mx-auto flex flex-col items-start justify-between gap-8  md:flex-row md:flex-wrap">
        <div className="max-w-[40ch] lg:max-w-[60ch] ">
          <h3 className="text-xl font-bold">FitTrackr</h3>
          <p className="my-8 text-neutral-400">
            Track your fitness journey with ease. FitTrackr is the ultimate
            workout logger for staying organized, motivated, and reaching your
            goals.
          </p>
          <div className="social flex gap-8">
            <Link href={"#"}>
              <Facebook className="h-8 w-8 transition-colors hover:fill-neutral-400" />
            </Link>
            <Link href={"#"}>
              <Twitter className="h-8 w-8 transition-colors hover:text-neutral-400" />
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold ">Company</h4>
          <nav className="mt-8">
            <ul className="flex flex-col gap-6">
              <Link href={"/about"} className="hover:text-neutral-400">
                About
              </Link>
              <Link
                href="https://github.com/No-Country/c11-33-ft-react-agregarback"
                className="hover:text-neutral-400"
              >
                Github
              </Link>
              <Link href={"/workout"} className="hover:text-neutral-400">
                Workout
              </Link>
              <Link href={"/exercises"} className="hover:text-neutral-400">
                Exercises
              </Link>
            </ul>
          </nav>
        </div>
        <div>
          <h4 className="text-lg font-bold ">Help</h4>
          <nav className="mt-8">
            <ul className="flex flex-col gap-6">
              <Link
                href="https://github.com/No-Country/c11-33-ft-react-agregarback/issues"
                className="hover:text-neutral-400"
              >
                Support
              </Link>
              <Link href="/Philosophy" className="hover:text-neutral-400">
                Philosophy
              </Link>

              <Link href={"/privacy"} className="hover:text-neutral-400">
                Privacy Policy
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
