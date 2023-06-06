import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      // Retrieve all routines
      const routines = await prisma.routine.findMany();

      res.status(200).json({ success: true, data: routines });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
}
