import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { routineId, logId, sets } = req.body;

      // Check if routine with the given ID exists
      const routine = await prisma.routine.findUnique({
        where: { id: routineId },
      });

      if (!routine) {
        res.status(404).json({ error: "Routine not found" });
        return;
      }

      // Find the log within the routine
      const log = await prisma.log.findUnique({
        where: { id: logId },
        include: { routineExercise: true },
      });

      if (!log) {
        res.status(404).json({ error: "Log not found" });
        return;
      }

      // Create sets and associate them with the log
      const createdSets = await Promise.all(
        sets.map(async (set: any) => {
          const createdSet = await prisma.set.create({
            data: {
              weight: set.weight,
              reps: set.reps,
              log: { connect: { id: logId } },
            },
          });
          return createdSet;
        }),
      );

      res
        .status(200)
        .json({ message: "Sets added successfully", sets: createdSets });
    } catch (error) {
      console.error("Error adding sets to log:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
