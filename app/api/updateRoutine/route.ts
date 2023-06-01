import { PrismaClient } from "@prisma/client"

export async function GET(req: Request) {
  const prisma = new PrismaClient;
  const body = await req.json()
   const exercises = await prisma.exercise.findMany()

   
  return new Response(JSON.stringify(exercises))
}

export async function POST(req: Request) {
  const prisma = new PrismaClient;
  const body = await req.json()
   const exercises = await prisma.exercise.create({
    data: body
   })

   
  return new Response(JSON.stringify('OK'))
}