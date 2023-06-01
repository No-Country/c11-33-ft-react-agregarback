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
    <li className="min-w-32 mx-2 my-4 rounded border-[1px] border-dashed border-accent-600 p-2 transition-shadow duration-500 hover:shadow-md hover:shadow-accent-600/20 md:min-w-[350px]">
      <Link
        className="flex gap-4"
        href={`/exercises/[id]/about?image=${image}`}
        as={`/exercises/${id}/about?image=${image}`}
      >
        <Image
          className="aspect-square h-32 w-32 rounded"
          src={image}
          alt={title}
          width={400}
          height={400}
        />
        <div>
          <p className="mb-1x text-lg font-bold text-accent-600 md:text-lg">
            {title}
          </p>
          <span className="font-thin text-neutral-100">{description}</span>
        </div>
      </Link>
    </li>
  );
}
