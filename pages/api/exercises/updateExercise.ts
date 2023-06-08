import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { exerciseId } = req.query;
  const { useful } = req.body;

  try {
    const updatedExercise = await prisma.exercise.update({
      where: { id: parseInt(exerciseId as string) },
      data: { useful: Boolean(useful) },
    });

    res.status(200).json(updatedExercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).json({ error: "Failed to update exercise" });
  }
}
