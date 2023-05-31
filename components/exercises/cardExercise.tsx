import Link from "next/link";

export default function cardExercise({
  id,
  title,
  description,
  image,
}: {
  id:number;
  title: string;
  description: string;
  image: string;
}) {
  // console.log(title, description, image);
  return (
    <div className="w-120 z-10 mx-2  my-3 box-border flex h-24 border-accent-600 border-[1px] border-dashed rounded p-2 text-black bg-transparent">
      <div className="mr-2 flex basis-1/4 justify-center items-center">
      <Link href="/exercises/[id]/about" as={`/exercises/${id}/about`}>
        <img className="w-h-full rounded" src={image} alt={title} />
      </Link>
      </div>
      <div className="basis-3/4">
        <p className="text-accent-600 font-bold text-xl mb-1x">{title}</p>
        <span className="text-neutral-100 font-thin">{description}</span>
      </div>
    </div>
  );
}
