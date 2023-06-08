import Link from "next/link";
import Image from "next/image";
import { Dispatch } from "react";
interface StateExercise {
  id: number;
  title: string;
}

export default function cardExercise({
  id,
  title,
  description,
  image,
  path,
  exercises,
  setExercises,
}: {
  id: number;
  title: string;
  description: string;
  image: string;
  path: string;
  exercises: StateExercise[];
  setExercises: React.Dispatch<React.SetStateAction<StateExercise[]>>;
}) {
  const handleSelect = (id: number, title: string) => {
    let arrayFilter = exercises.filter((e) => e.id === id);
    if (arrayFilter.length >= 1) {
      return null;
    } else {
      setExercises((state: StateExercise[]) => [...state, { id, title }]);
    }
  };
  return (
    <li className="min-w-32 mx-2 my-4 rounded border-[1px] border-dashed border-accent-600 p-2 transition-shadow duration-500 hover:shadow-md hover:shadow-accent-600/20 md:min-w-[350px]">
      <Link
        className="flex gap-4 transition-all hover:-translate-y-2"
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
          <p className="mb-1x text-lg font-bold capitalize text-accent-600 md:text-lg">
            {title}
          </p>
          <span className="font-thin capitalize text-neutral-100">
            {description}
          </span>
        </div>
      </Link>
      <button
        onClick={() => handleSelect(id, title)}
        className="m-auto mt-1 w-full rounded-md bg-accent-600 px-2 py-1 font-semibold text-primary-400 transition-all hover:bg-primary-500 hover:text-neutral-100"
      >
        Agregar
      </button>
    </li>
  );
}
