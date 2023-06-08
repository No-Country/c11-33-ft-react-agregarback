"use client";

import { useEffect, useState } from "react";
import Label from "@/components/exercises/record/label";

interface MaxLog {
  id: number;
  maxWeight: number;
  maxReps: number;
  date: string;
  routineExerciseId: number;
}

const PersonalRecords = ({ id }: { id: number }) => {
  const exerciseId = id;
  const [maxLog, setMaxLog] = useState<MaxLog | null>(null);

  useEffect(() => {
    const fetchMaxLogs = async () => {
      try {
        const response = await fetch(
          `/api/routine/getMaxLog?exerciseId=${exerciseId}`,
        );
        const data = await response.json();
        console.log("aca", data);
        setMaxLog(data.data);
      } catch (error) {
        console.error("Error fetching max logs:", error);
      }
    };

    fetchMaxLogs();
  }, []);

  return (
    <div className="z-10 m-auto my-2 min-w-[330px] bg-primary-400 p-3">
      <div className="m-auto my-2 min-w-[330px] p-3">
        {maxLog ? (
          <div>
            <Label
              title="Max volume Added"
              description={maxLog.maxWeight}
              sub="lbs"
            />
            <Label title="Max reps" description={maxLog.maxReps} sub="" />
          </div>
        ) : (
          <p>No max log available</p>
        )}
      </div>
    </div>
  );
};

export default PersonalRecords;
