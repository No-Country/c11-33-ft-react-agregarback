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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="routineName">Routine Name:</label>
        <input
          type="text"
          id="routineName"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="exerciseSelect">Select Exercises:</label>
        <select
          id="exerciseSelect"
          value={""}
          onChange={(e) => handleAddExercise(Number(e.target.value))}
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
      <div>
        <h3>Selected Exercises:</h3>
        {selectedExercises.length === 0 ? (
          <p>No exercises selected.</p>
        ) : (
          <ul>
            {selectedExercises.map((exercise) => (
              <li key={exercise.id}>
                {exercise.exercise.name}
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(exercise.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">Create Routine</button>
    </form>
  );
};

export default CreateRoutineForm;
