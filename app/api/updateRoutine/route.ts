import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  return new Response('HI')
}

export async function POST(req: Request) {

  return new Response('Ok')
}