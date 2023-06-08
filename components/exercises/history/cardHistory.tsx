"use client";
import { useState, useEffect } from "react";

interface ExerciseHistory {
  routineId: number;
  exerciseName: string;
  logs: {
    logId: number;
    date: string;
    sets: {
      id: number;
      weight: number;
      reps: number;
    }[];
  }[];
}

const CardHistory = () => {
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistory[]>([]);

  useEffect(() => {
    const fetchExerciseHistory = async () => {
      try {
        const response = await fetch(
          "/api/routine/getUserHistory?exerciseId=11",
        );
        const data = await response.json();
        console.log(data.exerciseHistory);
        setExerciseHistory(data.exerciseHistory);
      } catch (error) {
        console.error("Error fetching exercise history:", error);
      }
    };
    fetchExerciseHistory();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return { month, day, dayOfWeek, time };
  };

  const groupLogsByDay = (
    logs: {
      logId: number;
      date: string;
      sets: { id: number; weight: number; reps: number }[];
    }[],
  ) => {
    const groupedLogs: {
      [key: string]: {
        date: string;
        logs: {
          logId: number;
          date: string;
          sets: { id: number; weight: number; reps: number }[];
        }[];
      };
    } = {};

    for (const log of logs) {
      const { month, day, dayOfWeek } = formatDate(log.date);
      const key = `${dayOfWeek}, ${month} ${day}`;

      if (groupedLogs[key]) {
        groupedLogs[key].logs.push(log);
      } else {
        groupedLogs[key] = {
          date: key,
          logs: [log],
        };
      }
    }

    return Object.values(groupedLogs);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Exercise History</h2>
      <div className="flex flex-wrap">
        {exerciseHistory.map((exercise) => (
          <div key={exercise.routineId} className="w-[375px]">
            {groupLogsByDay(exercise.logs).map((group) => (
              <div key={group.date} className="mt-4">
                {group.logs.map((log) => (
                  <div key={log.logId}>
                    {log.sets.length > 0 && (
                      <>
                        <div className="rounded-lg p-4 shadow-md">
                          <h4
                            className="mb-2
text-lg font-semibold text-[#E6D5B8]"
                          >
                            {group.date}
                          </h4>
                          <h4
                            className="mb-2
text-lg font-semibold text-[#ffffff]"
                          >
                            {exercise.exerciseName}
                          </h4>
                          <ul>
                            <h5
                              className="mb-2
text-lg font-semibold text-[#E6D5B8]"
                            >
                              Sets Performed
                            </h5>
                            {log.sets.map((set) => (
                              <li key={set.id}>
                                Weight: {set.weight}, Reps: {set.reps}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHistory;
