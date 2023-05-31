import Link from "next/link";

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
    <div className="w-120 border-accent-600 z-10  mx-2 my-3 box-border flex h-24 rounded border-[1px] border-dashed bg-transparent p-2 text-black">
      <div className="mr-2 flex basis-1/4 items-center justify-center">
        <Link href="/exercises/[id]/about" as={`/exercises/${id}/about`}>
          <img className="w-h-full rounded" src={image} alt={title} />
        </Link>
      </div>
      <div className="basis-3/4">
        <p className="text-accent-600 mb-1x text-xl font-bold">{title}</p>
        <span className="font-thin text-neutral-100">{description}</span>
      </div>
    </div>
  );
}
