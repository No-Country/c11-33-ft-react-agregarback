"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavExercises({ id }: { id: number }) {
  const pathName = usePathname();

  console.log(pathName);

  const links = [
    {
      label: "About",
      route: "exercises/[id]/about",
      as: `/exercises/${id}/about`,
    },
    {
      label: "History",
      route: "exercises/[id]/history",
      as: `/exercises/${id}/history`,
    },
    {
      label: "Records",
      route: "exercises/[id]/records",
      as: `/exercises/${id}/records`,
    },
  ];

  console.log(links);

  return (
    <nav className="w-full">
      <ul className=" flex w-full">
        {links.map(({ label, route, as }) => {
          return (
            <li className="flex flex-1 justify-center" key={route}>
              <Link
                className={`text-xl font-bold ${
                  as === pathName ? "text-accent-600" : "text-neutral-100"
                }`}
                href={route}
                as={as}
              >
                {label.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
