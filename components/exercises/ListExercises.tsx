"use client";
import Card from "./CardExercise";
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/exercises/getExercises");
        const data = await res.json();
        setData(data.exercises);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const groupedItems = data.reduce<Record<string, Exercise[]>>(
    (acc, exercise) => {
      const firstLetter = exercise.name[0];
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(exercise);
      return acc;
    },
    {},
  );

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
        exercises,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (data.length <= 0)
    return (
      <div className="z-10 h-full w-full   bg-primary-400 text-2xl text-neutral-100">
        No hay data cargada
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
                  className="rounded border-[1px] border-neutral-100 p-1"
                >
                  {exer.title}{" "}
                  <button
                    onClick={() => {
                      handleDelete(exer.id);
                    }}
                    className="w-5 rounded bg-accent-400"
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay ejercicios seleccionados</p>
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
        className=" fixed bottom-4 right-4 z-[100] rounded bg-accent-400 p-3 text-lg text-neutral-100 hover:opacity-80"
      >
        Agregar Rutina
      </button>
    </>
  );
}
