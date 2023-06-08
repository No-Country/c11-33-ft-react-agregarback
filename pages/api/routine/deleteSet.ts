import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { setId } = req.query;

    try {
      const set = await prisma.set.findUnique({
        where: { id: Number(setId) },
      });
      console.log(set)

      if (!set) {
        return res.status(404).json({ error: "Set not found" });
      }

      await prisma.set.delete({
        where: { id: Number(setId) },
      });

      return res.status(200).json({
        success: true,
        message: "Set deleted successfully",
        set,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the set" });
    }
  }

  return res.status(400).json({ error: "Invalid request method" });
}