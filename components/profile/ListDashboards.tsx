"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "@/components/profile/dashboard";

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  useful: boolean;
}

interface Set {
  id: number;
  weight: number;
  setNumber: number;
  reps: number;
  logId: number;
}

interface Log {
  id: number;
  date: string;
  routineExerciseId: number;
  createdAt: string;
  sets: Set[];
}

interface RoutineExercise {
  id: number;
  routineId: number;
  exerciseId: number;
  exercise: Exercise;
  logs: Log[];
}

interface ResponseData {
  id: number;
  userId: string;
  createdAt: string;
  routineExercises: RoutineExercise[];
}

export default function ListDashboards() {
  const [dataDB, setDataDB] = useState<ResponseData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios("/api/routine/getRoutineUser");
      setDataDB(req.data.data);
    };
    fetchData();
  }, []);

  console.log(dataDB);

  return (
    <div className="flex w-full flex-wrap justify-center gap-4 md:h-60 md:w-[450px] md:flex-nowrap lg:w-[550px]">
      {dataDB &&
        dataDB.map((r: ResponseData,index) => {
          let fecha = new Date(r.createdAt);
          let formatoFecha = fecha.toLocaleDateString();
          let title = "AVERAGE REPS WORKOUT - " + formatoFecha;
          let labelsExercises = r.routineExercises.map(
            (re: RoutineExercise) => re.exercise.name,
          );
          let promedioRep = r.routineExercises.map((re: RoutineExercise) => {
            let suma = 0;
            re.logs[0].sets.forEach((l) => {
              suma = suma + l.reps;
            });
            return suma / re.logs[0].sets.length;
          });
          return (
            <Dashboard
              key={index}
              title={title}
              labelsets={labelsExercises}
              datasets={promedioRep}
            />
          );
        })}
    </div>
  );
}
