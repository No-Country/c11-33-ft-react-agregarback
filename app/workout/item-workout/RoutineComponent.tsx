"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [setInputVisible, setSetInputVisible] = useState(false);

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
        setSetInputVisible(false);
      }, 100);
      setRoutineData(updatedRoutineData);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSetInputVisible = (visible: any) => {
    setSetInputVisible(visible);
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
    <div className="z-10">
      {routineData.map((routine) => (
        <div
          key={routine.id}
          className="mb-4 rounded-lg border border-gray-200 p-4"
        >
          <h2 className="text-xl font-bold">Routine ID: {routine.id}</h2>
          {routine.routineExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="mt-4 rounded-lg border border-gray-200 p-4"
            >
              <h3 className="text-lg font-semibold">
                Exercise ID: {exercise.id}
              </h3>
              <p className="font-semibold">
                Exercise Name: {exercise.exercise.name}
              </p>
              <div className="mt-2">
                <img
                  src={exercise.exercise.gifUrl}
                  alt={exercise.exercise.name}
                  className="h-32 w-32 rounded-lg object-cover"
                />
              </div>
              {exercise.logs.length > 0 ? (
                <ul className="mt-4 flex flex-wrap space-x-4">
                  {exercise.logs.map((log) => (
                    <li key={log.id} className="mt-2 flex">
                      <p>Date: {log.date}</p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddSet(
                            routine.id,
                            exercise.id,
                            log.id,
                            newSet.weight,
                            newSet.reps,
                          );
                        }}
                        className="ml-4"
                      >
                        <button
                          type="submit"
                          className="rounded-md bg-white p-3"
                        >
                          Add Set
                        </button>
                        {log.sets.length > 0 ? (
                          <ul className="mt-2 flex space-x-2">
                            {log.sets.map((set) => (
                              <li key={set.id} className="mt-2">
                                <p>Weight: {set.weight}lbs</p>
                                <p>Reps: {set.reps}</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No sets yet</p>
                        )}
                        <div className="mt-4 flex space-x-2">
                          <input
                            type="number"
                            placeholder="Weight"
                            value={newSet.weight}
                            onChange={handleWeightChange}
                          />
                          <input
                            type="number"
                            placeholder="Reps"
                            value={newSet.reps}
                            onChange={handleRepsChange}
                          />
                        </div>
                      </form>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No logs available.</p>
              )}
            </div>
          ))}
        </div>
      ))}
      <div>
        {routineData.map((routine) => (
          <div key={routine.id}>
            {/* Render routine exercises */}
            {routine.routineExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center rounded-md bg-gray-200 p-4"
              >
                <img
                  src={exercise.exercise.gifUrl}
                  alt="Exercise"
                  className="h-24 w-24 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold">
                    {exercise.exercise.name}
                  </h2>
                  <p className="text-gray-600">{exercise.exercise.target}</p>
                  <div className="mt-4 flex flex-row space-x-7">
                    <div className="flex flex-col">
                      <span className="text-gray-600">Sets</span>
                      {exercise.logs.map((log) => (
                        <ul key={log.id}>
                          {log.sets.map((set) => (
                            <li key={set.id}>
                              <span className="text-2xl font-bold">
                                {set.id}
                              </span>
                            </li>
                          ))}
                          <div className="flex items-center">
                            {setInputVisible ? (
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAddSet(
                                      routine.id,
                                      exercise.id,
                                      log.id,
                                      newSet.weight,
                                      newSet.reps,
                                    )
                                  }
                                  className="ml-2 mt-3 h-6 w-6 rounded-full bg-green-500 text-white"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => toggleSetInputVisible(true)}
                                className="ml-2 mt-3 h-6 w-6 rounded-full bg-green-500 text-white"
                              >
                                +
                              </button>
                            )}
                          </div>
                        </ul>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Weight(lbs)</span>
                      {exercise.logs.map((log) => (
                        <ul key={log.id}>
                          {log.sets.map((set) => (
                            <li key={set.id}>
                              <span className="text-2xl font-bold">
                                {set.weight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ))}
                      {setInputVisible && (
                        <input
                          type="number"
                          placeholder="00"
                          value={newSet.weight}
                          min={1}
                          onChange={handleWeightChange}
                          className="mt-2 w-[60px] appearance-none rounded border px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring"
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Reps</span>
                      {exercise.logs.map((log) => (
                        <ul key={log.id}>
                          {log.sets.map((set) => (
                            <li key={set.id}>
                              <span className="text-2xl font-bold">
                                {set.reps}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ))}
                      {setInputVisible && (
                        <input
                          type="number"
                          placeholder="00"
                          min={1}
                          value={newSet.reps}
                          onChange={handleRepsChange}
                          className="mt-2 w-[60px] appearance-none rounded border px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring"
                        />
                      )}
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
