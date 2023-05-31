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
  const res = await fetch("http://localhost:3000/api/exercises/getExercises", {
    next: {
      revalidate: 60,
    },
  });
  const { exercises: exercisesData } = await res.json();

  const data: Exercise[] = exercisesData;

  console.log(data);

  // Agrupar elementos por letra de inicio
  const groupedItems = data.reduce((acc, exercise) => {
    // console.log(exercise.name[0])
    // if(isNan(exercise.name[0])){
    //   const firstLetter = exercise.name[0].toUpperCase();
    // } else{
    //   const firstLetter = exercise.name[0];
    // }
    const firstLetter = exercise.name[0];
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(exercise);
    return acc;
  }, {} as { [letter: string]: Exercise[] });

  // console.log(groupedItems)

  return (
    <div className="z-10 h-full w-full">
      {Object.keys(groupedItems)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <h2 className="mx-2 rounded-sm text-2xl font-semibold text-neutral-100">
              {letter.toUpperCase()}
            </h2>
            <ul>
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
                .slice(0, 5)}
            </ul>
          </div>
        ))}
    </div>
  );
}
