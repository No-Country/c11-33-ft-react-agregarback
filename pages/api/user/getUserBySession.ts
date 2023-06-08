import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  try {
    if (!session || !session.user || !session.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("User", session.user);

    const userId = session.user.id;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}
