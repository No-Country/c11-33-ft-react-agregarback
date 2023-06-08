import React from "react";
import Image from "next/image";
import Card from "@/components/home/card";
import CreateRoutineForm from "@/components/test/FormRoutine";
import CardHistory from "@/components/exercises/history/cardHistory";

export default async function Home() {
  return (
    <main className="z-10 bg-primary-400">
    <CreateRoutineForm/>
    <CardHistory/>
    </main>
  );
}
