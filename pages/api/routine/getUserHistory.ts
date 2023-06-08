import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  try {
    if (!session || !session.user || !session.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.user.id;

    const { exerciseId } = req.query;

    const routines = await prisma.routine.findMany({
      where: {
        userId,
        routineExercises: {
          some: {
            exerciseId: Number(exerciseId),
          },
        },
      },
      include: {
        routineExercises: {
          where: {
            exerciseId: Number(exerciseId),
          },
          include: {
            exercise: true,
            logs: {
              include: {
                sets: true,
              },
            },
          },
        },
      },
    });

    // Extract exercise history from routines
    const exerciseHistory = routines
      .flatMap((routine) =>
        routine.routineExercises.map((routineExercise) => {
          const logs = routineExercise.logs
            .filter((log) => log.sets.length > 0) // Filter out logs without sets
            .map((log) => ({
              logId: log.id,
              date: log.date,
              sets: log.sets,
            }));

          // Return null if there are no logs with sets
          if (logs.length === 0) {
            return null;
          }

          return {
            routineId: routine.id,
            exerciseId: routineExercise.exercise.id,
            exerciseName: routineExercise.exercise.name,
            logs,
          };
        }),
      )
      .filter((exercise) => exercise !== null); // Filter out exercises without logs

    res.status(200).json({ exerciseHistory });
  } catch (error) {
    console.error("Error fetching exercise history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
