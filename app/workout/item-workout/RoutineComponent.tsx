"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Trash from "../../../components/shared/icons/Trash";
import { toast } from "react-hot-toast";

interface Exercise {
  id: number;
  name: string;
  gifUrl: string;
  logs: Log[];
  target: string;
}

interface Log {
  id: number;
  date: string;
  sets: Set[];
}

interface Set {
  id: number;
  weight: number;
  reps: number;
}

interface Routine {
  id: number;
  routineExercises: {
    logs: Log[];
    id: number;
    exercise: Exercise;
  }[];
}

const RoutineComponent: React.FC = () => {
  const [routineData, setRoutineData] = useState<Routine[]>([]);
  const [newSet, setNewSet] = useState<Set>({ id: 0, weight: 0, reps: 0 });
  const [setInputVisible, setSetInputVisible] = useState(0);
  const [showRemove, setShowRemove] = useState(0);

  useEffect(() => {
    const fetchRoutineData = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Routine[] }>(
          "/api/routine/getRoutineById",
        );
        console.log(response.data.data);
        setRoutineData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoutineData();
  }, [routineData]);

  const handleAddSet = async (
    routineId: number,
    exerciseId: number,
    logId: number,
    weight: number,
    reps: number,
  ) => {
    try {
      const response = await axios.post("/api/routine/addSet", {
        routineId,
        exerciseId,
        logId,
        weight,
        reps,
      });
      console.log(response.data);

      const updatedRoutineData = routineData.map((routine) => {
        if (routine.id === routineId) {
          const updatedRoutineExercises = routine.routineExercises.map(
            (exercise) => {
              if (exercise.id === exerciseId) {
                const updatedLogs = exercise.logs.map((log) => {
                  if (log.id === logId) {
                    const updatedSets = [...log.sets, response.data];
                    return { ...log, sets: updatedSets };
                  }
                  return log;
                });
                return { ...exercise, logs: updatedLogs };
              }
              return exercise;
            },
          );
          return { ...routine, routineExercises: updatedRoutineExercises };
        }
        return routine;
      });
      setTimeout(() => {
        setSetInputVisible(0);
      }, 100);
      setRoutineData(updatedRoutineData);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSetInputVisible = (id: number) => {
    setSetInputVisible(id);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(event.target.value);
    setNewSet((prevSet) => ({ ...prevSet, weight }));
  };

  const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reps = Number(event.target.value);
    setNewSet((prevSet) => ({ ...prevSet, reps }));
  };

  return (
    <div className="z-10 text-neutral-100">
      <div>
        {routineData.map((routine) => (
          <div
            key={routine.id}
            className="grid w-full grid-cols-1 gap-3 px-3 md:grid-cols-2"
          >
            {/* Render routine exercises */}
            {routine.routineExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex flex-col justify-start rounded-md border-[1px] border-accent-600 px-4 "
              >
                <div className="grid grid-cols-3">
                  <h2 className="font-bolder col-span-2 text-2xl capitalize text-accent-600">
                    {exercise.exercise.name}
                  </h2>
                  <div className="flex items-center justify-end gap-6">
                    {showRemove === exercise.id && (
                      <>
                        <button
                          className="rounded bg-accent-400 px-2 text-accent-600 hover:opacity-80"
                          onClick={() => alert(exercise.id)}
                        >
                          Remove Exercise
                        </button>
                        <button
                          className="transition  hover:scale-125"
                          onClick={() => setShowRemove(0)}
                        >
                          X
                        </button>
                      </>
                    )}
                    {showRemove === 0 && (
                      <button
                        className="flex justify-end transition  hover:scale-125"
                        onClick={() => setShowRemove(exercise.id)}
                      >
                        ☰
                      </button>
                    )}
                  </div>
                </div>

                <p className="col-span-3 h-8 capitalize text-neutral-100">
                  {exercise.exercise.target}
                </p>
                <div className="grid grid-cols-3 justify-items-center">
                  <Image
                    src={exercise.exercise.gifUrl}
                    alt="Exercise"
                    className="col-span-1 m-auto w-[95%] rounded-xl pb-2"
                    height={400}
                    width={400}
                  />
                  <div className="col-span-2 w-full px-2">
                    <div className="flex flex-row justify-around">
                      <div className="flex flex-col">
                        <span className="border-b-2 text-md text-neutral-100 md:text-xl">
                          Sets
                        </span>
                        {exercise.logs.map((log) => (
                          <ul key={log.id}>
                            {log.sets.map((set, index) => (
                              <li key={set.id}>
                                <span className="block text-center font-semibold md:text-lg">
                                  {index + 1}
                                </span>
                              </li>
                            ))}
                            <div className="flex items-center justify-center pb-3">
                              {setInputVisible === exercise.id ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleAddSet(
                                      routine.id,
                                      exercise.id,
                                      log.id,
                                      newSet.weight,
                                      newSet.reps,
                                    );
                                    toast.success("Log successfully created");
                                  }}
                                  className="font-bolder mt-3 h-6 w-6 rounded-full bg-accent-500 text-white"
                                >
                                  ✓
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleSetInputVisible(exercise.id)
                                  }
                                  className="font-bolder mt-3 h-6 w-6 rounded-full bg-green-500 text-white"
                                >
                                  +
                                </button>
                              )}
                            </div>
                          </ul>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <span className="border-b-2 text-md text-neutral-100 md:text-xl">
                          Weight(lbs)
                        </span>
                        {exercise.logs.map((log) => (
                          <ul key={log.id}>
                            {log.sets.map((set) => (
                              <li key={set.id}>
                                <span className="block text-center font-semibold md:text-lg">
                                  {set.weight}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ))}
                        {setInputVisible === exercise.id && (
                          <input
                            type="number"
                            placeholder="00"
                            value={newSet.weight}
                            min={1}
                            onChange={handleWeightChange}
                            className="mx-auto mt-2 w-[70px] appearance-none rounded border px-3 py-1 text-gray-700 placeholder-gray-400 focus:ring"
                          />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="border-b-2 text-md text-neutral-100 md:text-xl">
                          Reps
                        </span>
                        {exercise.logs.map((log) => (
                          <ul key={log.id}>
                            {log.sets.map((set) => (
                              <li key={set.id}>
                                <span className="block text-center font-semibold md:text-lg">
                                  {set.reps}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ))}
                        {setInputVisible === exercise.id && (
                          <input
                            type="number"
                            placeholder="00"
                            min={1}
                            value={newSet.reps}
                            onChange={handleRepsChange}
                            className="mx-auto mt-2  w-[70px] appearance-none rounded border px-3 py-1 text-gray-700 placeholder-gray-400 focus:ring"
                          />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="block text-md text-neutral-100 md:text-xl">
                          <br />
                        </span>
                        {exercise.logs.map((log) => (
                          <ul key={log.id}>
                            {log.sets.map((set) => (
                              <li
                                key={set.id}
                                className="flex h-[25px] w-[25px] md:h-[30px] md:w-[30px]"
                              >
                                <button
                                  className="w-[100%] rounded-full  hover:bg-neutral-100 "
                                  onClick={() => alert(set.id)}
                                >
                                  <Trash className="m-auto w-[20px] p-[1px] md:w-[25px]" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineComponent;
