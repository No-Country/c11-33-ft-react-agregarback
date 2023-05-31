import prisma from "@/lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { bodyPart } = req.query;

    const exercises = await prisma.exercise.findMany({
      where: {
        bodyPart: bodyPart as string,
      },
    });

    res.status(200).json({ exercises });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "An error occurred while fetching body parts exercises.",
    });
  } finally {
    await prisma.$disconnect();
  }
}
