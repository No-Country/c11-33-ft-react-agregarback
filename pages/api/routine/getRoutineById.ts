import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    try {
      if (!session || !session.user || !session.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userId = session.user.id;

      const routine = await prisma.routine.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        include: {
          routineExercises: {
            include: {
              exercise: true,
              logs: {
                include: {
                  sets: true,
                },
              },
            },
          },
        },
      });

      res.status(201).json({ success: true, data: routine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
