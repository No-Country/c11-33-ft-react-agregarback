import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

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
        res.status(404).json({ error: "Routine not found" });
        return;
      }

      const exercise = routine.routineExercises[0];

      if (!exercise) {
        res.status(404).json({ error: "Exercise not found" });
        return;
      }

      const log = exercise.logs[0];

      if (!log) {
        res.status(404).json({ error: "Log not found" });
        return;
      }

      // Create the new set
      const newSet = await prisma.set.create({
        data: {
          weight,
          reps,
          log: { connect: { id: log.id } },
        },
      });

      res.status(200).json({
        success: true,
        message: "Set added successfully",
        set: newSet,
      });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while adding the set" });
      return;
    }
  }

  res.status(400).json({ error: "Invalid request method" });
}
