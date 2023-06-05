import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { routineId, exerciseId, logId, weight, reps } = req.body;

    try {
      // Find the routine, exercise, and log based on the provided IDs
      const routine = await prisma.routine.findUnique({
        where: { id: routineId },
        include: {
          routineExercises: {
            where: { id: exerciseId },
            include: {
              logs: {
                where: { id: logId },
              },
            },
          },
        },
      });

      if (!routine) {
        return res.status(404).json({ error: "Routine not found" });
      }

      const exercise = routine.routineExercises[0];

      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      const log = exercise.logs[0];

      if (!log) {
        return res.status(404).json({ error: "Log not found" });
      }

      // Create the new set
      const newSet = await prisma.set.create({
        data: {
          weight,
          reps,
          log: { connect: { id: log.id } },
        },
      });

      return res
        .status(200)
        .json({
          success: true,
          message: "Set added successfully",
          set: newSet,
        });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while adding the set" });
    }
  }

  return res.status(400).json({ error: "Invalid request method" });
}
