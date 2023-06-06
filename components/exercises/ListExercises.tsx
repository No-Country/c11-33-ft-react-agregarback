"use client";
import Card from "./CardExercise";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  days?: [];
}

interface StateExercise {
  id: number;
  title: string;
}

export default function ListExercises({ path }: { path: string }) {
  const [data, setData] = useState<Exercise[]>([]);
  const [exercises, setExercises] = useState<StateExercise[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exercisesLocal = localStorage.getItem("exercisesLocal");
        // console.log(exercisesLocal);
        if (exercisesLocal === null) {
          const res = await fetch("/api/exercises/getExercises");
          const data = await res.json();
          setData(data.exercises);
          localStorage.setItem(
            "exercisesLocal",
            JSON.stringify(data.exercises),
          );
        } else {
          // console.log(exercisesLocal);
          setData(JSON.parse(exercisesLocal));
        }
      } catch (error) {
        console.log(error);
        toast.error("Something goes wrong!, not data");
      }
    };

    fetchData();
  }, []);

  const groupedItems = data.reduce((acc, exercise) => {
    const firstLetter = exercise.name[0];
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(exercise);
    return acc;
  }, {} as { [letter: string]: Exercise[] });

  const handleDelete = (id: number) => {
    const exercisesFiltrados = exercises.filter(
      (exercise) => exercise.id !== id,
    );
    setExercises(exercisesFiltrados);
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post("/api/routine/createRoutine", {
        name: "Rutina Joe",
        exercises: exercises,
      });
      toast.success("Routine created successfully");
      router.push("/workout/item-workout");
      console.log(res);
    } catch (error) {
      toast.error("Something goes wrong!");
    }
  };

  if (data.length <= 0)
    return (
      <div className="z-10 flex h-full  w-full items-center justify-center text-center text-2xl text-neutral-100">
        Loading exercises for your routines!
        <br />
        No pain, no gain!
      </div>
    );

  return (
    <>
      <div className="fixed z-[100] w-full bg-accent-600 py-1 text-center">
        {exercises.length > 0 ? (
          <ul className="flex flex-wrap gap-3 px-3">
            {exercises.map((exer) => {
              return (
                <li
                  key={exer.id}
                  className="rounded border-[1px] border-neutral-100 p-1 capitalize"
                >
                  {exer.title}{" "}
                  <button
                    onClick={() => handleDelete(exer.id)}
                    className="w-5 rounded bg-accent-400"
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="font-bolder text-gray-700">
            Don´t select any exercise yet!
          </p>
        )}
      </div>
      <div className="grid-auto-fit z-10 h-full w-full gap-6 bg-primary-400  px-20 py-8">
        {Object.keys(groupedItems)
          .sort()
          .slice(2)
          .map((letter) => (
            <div key={letter} className="w-full gap-4  md:flex">
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
                      path={path}
                      exercises={exercises}
                      setExercises={setExercises}
                    />
                  ))
                  .slice(0, 4)}
              </ul>
            </div>
          ))}
      </div>
      <button
        onClick={handleCreate}
        className=" fixed bottom-4 left-auto right-auto z-[100] rounded bg-accent-400 p-3 text-lg text-neutral-100 opacity-50 transition-all hover:opacity-100"
      >
        Start Routine
      </button>
    </>
  );
}
