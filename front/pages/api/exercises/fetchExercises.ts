import axios from "axios";
import prisma from "@/lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

//CUIDADO CON HACER GET !!! SOLO EN CASO DE LIMPIAR LA BASE DE DATOS
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const headers = {
      "X-RapidAPI-Key": "10750bee93msha09cae90db0ac58p195fdfjsna4904a8fe8ba",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    };

    const response = await axios.get(
      "https://exercise-database.p.rapidapi.com/exercises",
      { headers },
    );
    const exercises = response.data;

    for (const exercise of exercises) {
      await prisma.exercise.create({
        data: {
          bodyPart: exercise.bodyPart,
          equipment: exercise.equipment,
          gifUrl: exercise.gifUrl,
          name: exercise.name,
          target: exercise.target,
        },
      });
    }

    console.log("Exercises saved to database.");
    res.status(200).json({ message: "Exercises saved to database." });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error occurred while saving exercises to database." });
  } finally {
    await prisma.$disconnect();
  }
}
