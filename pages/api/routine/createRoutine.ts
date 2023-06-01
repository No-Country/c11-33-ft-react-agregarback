import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    try {
      if (!session || !session.user || !session.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      console.log("User", session.user);

      const userId = session.user.id;

      const { exercises } = req.body;
      console.log("Exercises", exercises);

      // Create the routine
      const routine = await prisma.routine.create({
        data: {
          userId,
          routineExercises: {
            create: exercises.map((exercise: any) => ({
              exercise: { connect: { id: exercise.id } },
              logs: {
                create: [], // hacer un prisma.update para populear esto
              },
            })),
          },
        },
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

      res.status(201).json({ success: true, data: routine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
}
