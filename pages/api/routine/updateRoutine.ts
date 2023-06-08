import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    try {
      const { routineId, logId, sets } = req.body;

      const routine = await prisma.routine.findUnique({
        where: { id: routineId },
      });

      if (!routine) {
        return res.status(404).json({ error: "Routine not found" });
      }

      const log = await prisma.log.findUnique({
        where: { id: logId },
        include: { routineExercise: true },
      });

      if (!log) {
        return res.status(404).json({ error: "Log not found" });
      }

      const createdSets = await Promise.all(
        sets.map(async (set: any) => {
          const createdSet = await prisma.set.create({
            data: {
              weight: set.weight,
              reps: set.reps,
              setNumber: set.setNumber,
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
