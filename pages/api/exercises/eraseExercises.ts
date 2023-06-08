import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    await prisma.routineExercise.deleteMany();

    const deleteManyResult = await prisma.exercise.deleteMany();

    res.status(200).json({ message: "Records deleted successfully" });
  } catch (error) {
    console.error("Error deleting records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
