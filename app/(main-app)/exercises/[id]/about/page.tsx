"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
interface Params {
  id: number;
}

export default function About({ params }: { params: Params }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const image: string | null | undefined = searchParams?.get("image");
  console.log("IMAGE:", image);

  const instructions: string[] = [
    "Process..."
  ];

  return (
    <div className="z-10 bg-primary-400 md:flex md:flex-row">
      <div className="py-auto flex w-full content-center justify-center p-4 md:flex md:h-[300px] md:basis-2/5 md:content-center md:justify-center">
        {/* <img className="h-full" src="/logo.png" alt="About exercise" /> */}
        {image ? (
          <img
            className="py-auto h-full rounded"
            src={`/${image}`}
            alt="About exercise"
            width={300}
            height={500}
          />
        ) : (
          <img
            className="h-full rounded"
            src={`/${image}`}
            alt="About exercise"
            width={300}
            height={500}
          />
        )}
      </div>
      <div className="p-4 md:basis-3/5">
        <h4 className="px-4 text-xl font-semibold text-accent-600">
          Instructions
        </h4>
        <ol className="px-4 text-xl text-white/70">
          {/* {instructions.map((ins, index) => (
            <li key={index} className="text-neutral-100">
              {index + 1}. {ins}
            </li>
          ))} */}
          Process...
        </ol>
      </div>
    </div>
  );
}
