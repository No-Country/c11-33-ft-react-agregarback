import Card from "@/components/exercises/cardExercise";

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  days?: [];
}

export default async function Exercises() {
  // ! TODO : Codigo para conectar con la API de Backend
  // const res = await fetch("http://localhost:3000/api/exercises/getExercises", {
  //   next: {
  //     revalidate: 60,
  //   },
  // });

  // ! Conectando con la API directa
  const res = await fetch(
    "https://exercise-database.p.rapidapi.com/exercises",
    {
      headers: {
        "X-RapidAPI-Key": "10750bee93msha09cae90db0ac58p195fdfjsna4904a8fe8ba",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
      next: {
        revalidate: 60,
      },
    },
  );

  // !TODO Desestructuracion de exercision de data de backend
  // const { exercises: exercisesData } = await res.json();

  // const data: Exercise[] = exercisesData;
  // ! Extrayendo data de API directa
  const data: Exercise[] = await res.json();

  console.log("DATA", data);

  const groupedItems = data.reduce((acc, exercise) => {
    const firstLetter = exercise.name[0];
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(exercise);
    return acc;
  }, {} as { [letter: string]: Exercise[] });

  if (data.length <= 0)
    return (
      <div className="z-10 h-full bg-primary-400   w-full text-2xl text-neutral-100">
        No hay data cargada
      </div>
    );
  return (
    <div className="z-10 h-full w-full px-20 bg-primary-400 py-5  grid-auto-fit gap-6">
      {Object.keys(groupedItems)
        .sort()
        .map((letter) => (
          <div key={letter}
          className="w-full md:flex  gap-4"
          >
            <span className="rounded-sm text-2xl font-semibold text-neutral-100">
              {letter.toUpperCase()}
            </span>
            <ul className="w-full">
              {groupedItems[letter]
                .map(({ id, name, bodyPart, gifUrl }) => (
                  <Card
                    key={id}
                    id={id}
                    title={name}
                    description={bodyPart}
                    image={gifUrl}
                  />
                ))
                .slice(0, 4)}
            </ul>
          </div>
        ))}
    </div>
  );
}