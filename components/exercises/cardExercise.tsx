import Link from "next/link";
import Image from "next/image";

export default function cardExercise({
  id,
  title,
  description,
  image,
}: {
  id: number;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="w-120 z-10  mx-2 my-3 box-border flex h-24 rounded border-[1px] border-dashed border-accent-600 bg-transparent p-2 text-black ">
      <div className="mr-2 flex basis-1/4 items-center justify-center">
        <Link
          href={`/exercises/[id]/about?image=${image}`}
          as={`/exercises/${id}/about?image=${image}`}
        >
          {/* <img className="w-h-[full] rounded" src={image} alt={title} /> */}
          <Image
            className="w-h-[full] rounded"
            src={image}
            alt={title}
            width={300}
            height={100}
          />
        </Link>
      </div>
      <div className="basis-3/4">
        <p className="mb-1x text-lg font-bold text-accent-600">{title}</p>
        <span className="font-thin text-neutral-100">{description}</span>
      </div>
    </div>
  );
}
