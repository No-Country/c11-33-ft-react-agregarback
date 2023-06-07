import Link from "next/link";
import { Facebook, Twitter } from "@/components/shared/icons/";
export default function Footer() {
  return (
    <div className="absolute  w-full border-gray-200 bg-primary-400 py-12  text-white">
      <div className="container mx-auto flex flex-col md:flex-row md:flex-wrap items-start  justify-between gap-8">
        <div className="max-w-[40ch] lg:max-w-[60ch] ">
          <h3 className="text-xl font-bold">FitTrackr</h3>
          <p className="my-8 text-neutral-400">
          Track your fitness journey with ease. FitTrackr is the ultimate workout logger for staying organized, motivated, and reaching your goals.
          </p>
          <div className="social flex gap-8">
            <Link href={"#"} >

            <Facebook className="w-8 h-8 hover:fill-neutral-400 transition-colors"/>
            </Link>
            <Link href={"#"} >

            <Twitter className="w-8 h-8 hover:text-neutral-400 transition-colors"/>
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold ">Company</h4>
          <nav className="mt-8">
            <ul className="flex flex-col gap-6">
              <Link href="#" className="hover:text-neutral-400">
                <li> About </li>
              </Link>
              <Link href="#" className="hover:text-neutral-400">
                <li> Features </li>
              </Link>
              <Link href="#" className="hover:text-neutral-400">
                <li> Workout </li>
              </Link>
              <Link href="#" className="hover:text-neutral-400">
                <li> Exercises </li>
              </Link>
            </ul>
          </nav>
        </div>
        <div>
          <h4 className="text-lg font-bold ">Help</h4>
          <nav className="mt-8">
            <ul className="flex flex-col gap-6">
              <Link href="#" className="hover:text-neutral-400">
                <li> Customer Support </li>
              </Link>
              <Link href="#" className="hover:text-neutral-400">
                <li> Delivery Details </li>
              </Link>

              <Link href="#" className="hover:text-neutral-400">
                <li> Privacy Policy </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
