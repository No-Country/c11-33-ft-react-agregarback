"use client";
import Card from "./CardExercise";
import React from "react";
import { useState, useEffect } from "react";
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

interface StateExercise{
  id:number;
  title:string;
}

export default function ListExercises({ path }: { path: string }) {
  const [data, setData] = useState<Exercise[]>([]);
  const [exercises,setExercises]=useState<StateExercise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/exercises/getExercises"
        );
        const data = await res.json();
        setData(data.exercises);
      } catch (error) {
        console.log(error);
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

  const handleDelete = (id:number)=>{
    const exercisesFiltrados = exercises.filter(exercise => exercise.id !== id);
    setExercises(exercisesFiltrados);
  }

  const handleCreate = async ()=>{
    try {
      const res = await axios.post("http://localhost:3000/api/routine/createRoutine", {
        name:"Rutina Joe",
        exercises: exercises
      })
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  if (data.length <= 0)
    return (
      <div className="z-10 h-full w-full   bg-primary-400 text-2xl text-neutral-100">
        No hay data cargada
      </div>
    );

  return (
    <>
    <div className="fixed z-[100] bg-accent-600 w-full text-center py-1">
      { 
      exercises.length > 0 ? <ul className="flex gap-3 flex-wrap px-3">{exercises.map((exer)=>{
        return <li key={exer.id} className="border-neutral-100 border-[1px] p-1 rounded">{exer.title} <button onClick={()=>handleDelete(exer.id)} className="bg-accent-400 rounded w-5">X</button></li>
      })}</ul> : <p>No hay ejercicios seleccionados</p>      
      }
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
      className=" right-4 bottom-4 fixed z-[100] p-3 rounded bg-accent-400 text-neutral-100 text-lg hover:opacity-80">Agregar Rutina</button>
    </>
  );
}
