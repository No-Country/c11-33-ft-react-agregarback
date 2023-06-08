import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function fillMaxLog(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    try {
      if (!session || !session.user || !session.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userId = session.user.id;

      const routines = await prisma.routine.findMany({
        where: { userId },
        include: {
          routineExercises: {
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

      const maxLogs = [];

      for (const routine of routines) {
        for (const routineExercise of routine.routineExercises) {
          let maxReps = 0;
          let maxWeight = 0;

          for (const log of routineExercise.logs) {
            for (const set of log.sets) {
              if (set.reps > maxReps) {
                maxReps = set.reps;
              }
              if (set.weight > maxWeight) {
                maxWeight = set.weight;
              }
            }
          }

          const maxLog = await prisma.maxLog.upsert({
            where: {
              routineExerciseId: routineExercise.id,
            },
            update: {
              maxReps,
              maxWeight,
            },
            create: {
              maxReps,
              maxWeight,
              date: new Date(),
              routineExerciseId: routineExercise.id,
            },
          });

          maxLogs.push(maxLog);
        }
      }

      res.status(200).json({ success: true, data: maxLogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
}
