"use client";
import { useState, useEffect, FormEvent } from "react";

interface Exercise {
  id: number;
  name: string;
}

interface RoutineExercise {
  id: number;
  exercise: Exercise;
}

const CreateRoutineForm = () => {
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<RoutineExercise[]>(
    [],
  );

  useEffect(() => {
    // Fetch exercises from the endpoint
    const fetchExercises = async () => {
      try {
        const response = await fetch("/api/exercises/getExercises");
        if (response.ok) {
          const data = await response.json();

          setExercises(data.exercises);
        } else {
          console.error("Error fetching exercises");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchExercises();
  }, []);

  const handleAddExercise = (exerciseId: number) => {
    const exercise = exercises.find((exercise) => exercise.id === exerciseId);
    if (exercise) {
      setSelectedExercises((prevExercises) => [
        ...prevExercises,
        { id: exerciseId, exercise },
      ]);
    }
  };

  const handleRemoveExercise = (exerciseId: number) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== exerciseId),
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedExercises.length === 0) {
      console.error("No exercises selected.");
      return;
    }
    const routineData = {
      name: routineName,
      exercises: selectedExercises,
    };

    try {
      const response = await fetch("/api/routine/createRoutine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routineData),
      });

      if (response.ok) {
        // Routine created successfully
        const data = await response.json();
        console.log("Routine created:", data);
        // Reset form
        setRoutineName("");
        setSelectedExercises([]);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error("Error creating routine:", errorData.error);
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <h2 className="font-variant text-xl text-gray-700">Create Rotune</h2>
      <div className="mb-4">
        <label
          htmlFor="routineName"
          className="mb-2 block font-bold text-gray-700"
        >
          Routine Name:
        </label>
        <input
          type="text"
          id="routineName"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="exerciseSelect"
          className="mb-2 block font-bold text-gray-700"
        >
          Select Exercises:
        </label>
        <select
          id="exerciseSelect"
          value={""}
          onChange={(e) => handleAddExercise(Number(e.target.value))}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        >
          <option value="" disabled>
            Select Exercise
          </option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h3 className="mb-2 font-bold text-gray-700">Selected Exercises:</h3>
        {selectedExercises.length === 0 ? (
          <p>No exercises selected.</p>
        ) : (
          <ul>
            {selectedExercises.map((exercise) => (
              <li
                key={exercise.id}
                className="mb-2 flex items-center justify-between rounded-lg bg-gray-200 px-3 py-2"
              >
                <span className="text-gray-700">{exercise.exercise.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(exercise.id)}
                  className="focus:shadow-outline rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700 focus:outline-none"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        Create Routine
      </button>
    </form>
  );
};

export default CreateRoutineForm;
