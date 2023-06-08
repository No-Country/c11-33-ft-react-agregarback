import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function getMaxLogByExerciseId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    try {
      if (!session || !session.user || !session.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      console.log("User", session.user);

      const userId = session.user.id;

      const { exerciseId } = req.query;

      const maxLog = await prisma.maxLog.findFirst({
        where: {
          routineExercise: {
            exerciseId: Number(exerciseId),
            routine: {
              userId,
            },
          },
        },
        orderBy: [
          {
            maxReps: "desc",
          },
          {
            maxWeight: "desc",
          },
        ],
      });

      res.status(200).json({ success: true, data: maxLog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
}
