import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name } = req.body;

  try {
    const routine = await prisma.routine.create({
      data: {
        name,
        // Include the userId in the routine data
      },
    });

    res.status(201).json({ routine });
  } catch (error) {
    res.status(500).json({ error: "Failed to create routine" });
  }
}
