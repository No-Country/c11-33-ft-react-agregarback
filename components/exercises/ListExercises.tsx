"use client";
import Card from "./CardExercise";
import React, { ChangeEvent } from "react";
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

interface DataBaseType {
  data: Exercise[];
  allData: Exercise[];
}

export default function ListExercises({ path }: { path: string }) {
  const [data, setData] = useState<Exercise[]>([]);
  const [use, setUse] = useState<boolean>(false);
  const [dataBase, setDataBase] = useState<DataBaseType>({
    data: [],
    allData: [],
  });

  const [exercises, setExercises] = useState<StateExercise[]>([]);
  const [input, setInput] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exercisesLocal = sessionStorage.getItem("exercisesLocal");
        // console.log(exercisesLocal);
        if (exercisesLocal === null) {
          const res = await fetch("/api/exercises/getExercises");
          const data = await res.json();
          const sliceData = data.exercises.slice(2);
          setData(sliceData);
          setDataBase({
            data: sliceData,
            allData: sliceData,
          });
          sessionStorage.setItem("exercisesLocal", JSON.stringify(sliceData));
        } else {
          // console.log(exercisesLocal);
          setData(JSON.parse(exercisesLocal));
          setDataBase({
            data: JSON.parse(exercisesLocal),
            allData: JSON.parse(exercisesLocal),
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Something goes wrong!, not data");
      }
    };

    fetchData();
  }, []);

  const groupedItems = dataBase.data.reduce((acc, exercise) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    const filterData = dataBase.data.filter((e) => e.name.includes(input));
    setDataBase({
      ...dataBase,
      data: filterData,
    });
    setUse(true);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500);
  };

  const handleReset = () => {
    setInput("");
    setDataBase({
      ...dataBase,
      data: dataBase.allData,
    });
    setUse(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        <div>
          <input
            className="mb-2 min-w-[220px] rounded-lg md:min-w-[600px]"
            onChange={handleChange}
            type="text"
            value={input}
            placeholder="Name Exercise"
          ></input>
          <button
            className={`mx-2 rounded bg-primary-500 p-2 text-neutral-100 ${
              use ? "bg-slate-300" : ""
            } 
            ${use ? "cursor-not-allowed" : ""}
            transition-all
            hover:scale-105
            `}
            disabled={use}
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="mx-2 rounded  bg-accent-400 p-2 text-neutral-100 transition-all
            hover:scale-105"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
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
      <div className="grid-auto-fit z-10 h-full w-full gap-6 bg-primary-400  px-20 py-24">
        {Object.keys(groupedItems)
          .sort()
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
