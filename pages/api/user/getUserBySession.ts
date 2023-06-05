import { type NextApiResponse, type NextApiRequest } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  try {
    if (!session?.user?.id) {
      res.status(401).json({ error: "Unauthorized" });
      return;
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
