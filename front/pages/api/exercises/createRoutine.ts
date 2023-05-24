import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, name, exerciseIds } = req.body;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ message: "Invalid userId" });
  }

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Invalid name" });
  }

  try {
    const { userId, name, exercises } = req.body;
    const routine = await prisma.routine.create({
      data: {
        name,
        userId,
        exercises: {
          create: exercises.map((exercise: any) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            repetitions: exercise.repetitions,
          })),
        },
      },
      include: {
        exercises: true,
      },
    });

    res.status(201).json({ routine });
  } catch (error) {
    console.error("Error creating routine:", error);
    res.status(500).json({ error: "Unable to create routine" });
  }
}
