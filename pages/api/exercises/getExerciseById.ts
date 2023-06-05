import prisma from "@/lib/prisma";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { id } = req.query;

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: Number(id) },
    });

    if (!exercise) {
      res.status(404).json({ message: "Exercise not found" });
      return;
    }

    res.status(200).json(exercise);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error occurred while fetching exercise" });
  }
}
