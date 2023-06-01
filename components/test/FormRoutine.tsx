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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-xl font-variant text-gray-700">Create Rotune</h2>
  <div className="mb-4">
    <label htmlFor="routineName" className="block text-gray-700 font-bold mb-2">
      Routine Name:
    </label>
    <input
      type="text"
      id="routineName"
      value={routineName}
      onChange={(e) => setRoutineName(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="exerciseSelect" className="block text-gray-700 font-bold mb-2">
      Select Exercises:
    </label>
    <select
      id="exerciseSelect"
      value={""}
      onChange={(e) => handleAddExercise(Number(e.target.value))}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
    <h3 className="text-gray-700 font-bold mb-2">Selected Exercises:</h3>
    {selectedExercises.length === 0 ? (
      <p>No exercises selected.</p>
    ) : (
      <ul>
        {selectedExercises.map((exercise) => (
          <li key={exercise.id} className="flex justify-between items-center py-2 px-3 bg-gray-200 rounded-lg mb-2">
            <span className="text-gray-700">{exercise.exercise.name}</span>
            <button
              type="button"
              onClick={() => handleRemoveExercise(exercise.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    Create Routine
  </button>
</form>
  );
};

export default CreateRoutineForm;
