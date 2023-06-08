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
      setNumber: number;
    }[];
  }[];
}

const CardHistory = ({ id }: { id: number }) => {
  const exerciseId = id;

  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistory[]>([]);

  useEffect(() => {
    const fetchExerciseHistory = async () => {
      try {
        const response = await fetch(
          `/api/routine/getUserHistory?exerciseId=${exerciseId}`,
        );
        const data = await response.json();

        // Fetch maxLog data
        const maxLogResponse = await fetch("/api/routine/maxLog", {
          method: "POST",
        });
        const maxLogData = await maxLogResponse.json();

        // Combine exercise history with maxLog data
        const exerciseHistoryWithMaxLog = data.exerciseHistory.map(
          (exercise: any) => {
            const maxLog = maxLogData.data.find(
              (maxLog: any) =>
                maxLog.routineExerciseId === exercise.routineExerciseId,
            );
            return {
              ...exercise,
              maxLog,
            };
          },
        );

        console.log(exerciseHistoryWithMaxLog);
        setExerciseHistory(exerciseHistoryWithMaxLog);
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

  const formatTimeOfDay = (hour: number) => {
    if (hour >= 5 && hour < 12) {
      return "Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Noon";
    } else {
      return "Night";
    }
  };

  const groupLogsByDay = (
    logs: {
      logId: number;
      date: string;
      sets: { id: number; weight: number; reps: number; setNumber: number }[];
    }[],
  ) => {
    const groupedLogs: {
      [key: string]: {
        date: string;
        logs: {
          logId: number;
          date: string;
          sets: {
            id: number;
            weight: number;
            reps: number;
            setNumber: number;
          }[];
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
      <div className="flex flex-wrap gap-5">
        {exerciseHistory.map((exercise) => (
          <div key={exercise.routineId} className="w-[375px]">
            {groupLogsByDay(exercise.logs).map((group) => (
              <div key={group.date} className="mt-4">
                {group.logs.map((log) => (
                  <div key={log.logId}>
                    {log.sets.length > 0 && (
                      <div className="rounded-lg border-2 border-white p-4 shadow-md">
                        <h4 className="mb-2 text-lg font-semibold text-[#E6D5B8]">
                          {formatTimeOfDay(new Date(log.date).getHours())}{" "}
                          Workout
                        </h4>
                        <h4 className="mb-2 text-lg font-semibold text-[#ffffff]">
                          {formatDate(log.date).dayOfWeek},{" "}
                          {formatDate(log.date).month}{" "}
                          {formatDate(log.date).day},{" "}
                          {formatDate(log.date).time}
                        </h4>
                        <ul>
                          <h5 className="mb-2 text-lg font-semibold text-[#E6D5B8]">
                            Sets Performed
                          </h5>
                          {log.sets.map((set) => (
                            <li key={set.id} className="grid grid-cols-3">
                              <p className="text-white">
                                {set.setNumber} ({set.weight}lbs) x {set.reps}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
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
