"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Exercise {
  id: number;
  name: string;
  useful: boolean;
  gifUrl: string;
}

const ExercisesUseful = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(
          "/api/exercises/getExercisesByBody?bodyPart=chest",
        );
        const data = await response.json();
        console.log("aqui", data);
        setExercises(data.exercises); // Update the state with response.data.exercises
      } catch (error) {
        console.log("Error Fetching The Exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div>
      <h1>Useful or Not</h1>
      {Array.isArray(exercises) ? (
        exercises.map((exercise: Exercise) => (
          <div key={exercise.id}>
            <h1>{exercise.name}</h1>
            <Image
              src={exercise.gifUrl}
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
        ))
      ) : (
        <p>No exercises found.</p>
      )}
    </div>
  );
};

export default ExercisesUseful;
