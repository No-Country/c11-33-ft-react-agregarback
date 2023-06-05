import { type NextApiRequest, type NextApiResponse } from "next";
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
      if (!session?.user?.id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
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

      const logPromises = exercises.map(async (exercise: any) => {
        const routineExercise = await prisma.routineExercise.findFirst({
          where: {
            routineId: routine.id,
            exerciseId: exercise.id,
          },
        });

        if (routineExercise) {
          await prisma.log.create({
            data: {
              date: new Date(),
              routineExercise: {
                connect: {
                  id: routineExercise.id,
                },
              },
            },
          });
        }
      });

      await Promise.all(logPromises);

      const updatedRoutine = await prisma.routine.findUnique({
        where: {
          id: routine.id,
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

      res.status(201).json({ success: true, data: updatedRoutine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
