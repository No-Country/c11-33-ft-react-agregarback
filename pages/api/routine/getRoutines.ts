import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      // Retrieve all routines
      const routines = await prisma.routine.findMany({
        include: {
          routineExercises: {
            include: {
              exercise: true,
              logs: {
                include: {
                  sets: true,
                },
              },
              maxLog: true,
            },
          },
        },
      });

      res.status(200).json({ success: true, data: routines });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
}
