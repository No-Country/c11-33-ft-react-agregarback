import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, routineDays, userId } = req.body;

    const createdRoutine = await prisma.routine.create({
      data: {
        name,
        userId,
        routineDays: {
          create: routineDays.map((routineDay: any) => ({
            day: routineDay.day,
            week: routineDay.week,
            exercises: {
              create: routineDay.exercises.map((exercise: any) => ({
                sets: exercise.sets,
                repetitions: exercise.repetitions,
                logs: {
                  create: exercise.logs.map((log: any) => ({
                    weight: log.weight,
                    reps: log.reps,
                    date: new Date(log.date),
                  })),
                },
                maxLog: exercise.maxLog
                  ? {
                      create: {
                        maxWeight: exercise.maxLog.maxWeight,
                        maxReps: exercise.maxLog.maxReps,
                        date: new Date(exercise.maxLog.date),
                      },
                    }
                  : undefined,
                exercise: {
                  connect: { id: exercise.exerciseId },
                },
              })),
            },
          })),
        },
      },
      include: {
        routineDays: {
          include: {
            exercises: {
              include: {
                logs: true,
                maxLog: true,
                exercise: true,
              },
            },
          },
        },
      },
    });
    res.status(201).json(createdRoutine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create routine" });
  }
}
