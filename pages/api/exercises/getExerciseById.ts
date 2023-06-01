import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: Number(id) },
    });

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error occurred while fetching exercise" });
  } finally {
    await prisma.$disconnect();
  }
}
