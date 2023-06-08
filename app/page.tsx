import React from "react";
import Image from "next/image";
import Card from "@/components/home/card"

export default async function Home() {
  return (
    <main className="z-10 bg-primary-400">
      <section className="hero">
        <div className="container px-4 md:grid md:grid-cols-2 gap-8 md:items-center">
          <div>
            <h1 className="text-3xl md:text-5xl text-accent-600 font-semibold">FitTrackr Your Ultimate Workout Logger</h1>
            <p className="text-base text-neutral-400 leading-8 md:text-xl">Track your fitness journey with ease. FitTrackr is the ultimate workout logger for staying organized, motivated, and reaching your goals.</p>
            <div className="mt-8">
              <span className="text-3xl font-semibold text-accent-600">5,910+</span>
              <p className="text-base text-neutral-400 max-w-[25ch] leading-8">Customers are using & it’s growing everyday</p>
            </div>
          </div>
          <Image
         className="mt-8 rounded w-full max-w-[377px] md:col-start-1 md:row-start-1"
         src="/assets/hero.png"
         alt="hero-image"
         width={1200}
         height={800}
          />
        </div>

      </section>

      <section className="mt-20 px-4">
        <div className="container px-4 grid items-center">
          <span className="text-center text-neutral-100 text-base lg:text-xl">Say hello to FitTrackr</span>
          <h2 className="text-accent-600 text-center font-semibold text-2xl mt-8 lg:text-4xl">Unlimited Options give you the ultimate flexibility</h2>
        </div>
        <div className="mt-8 grid gap-16 lg:grid-cols-2 place-items-center lg:gap-0 lg:gap-y-8">
          <Card
          title="Always Free:"
          description="FitTrackr offers a free version with essential features, ensuring that you can start tracking your workouts without any cost."
          />
          <Card
          title="Open Source: "
          description="FitTrackr is built on open-source technology, allowing developers to contribute, customize, and enhance the platform to meet their specific needs"
          classname="lg:translate-y-12"
          />
          <Card
          title="Lots of exercises: "
          description="FitTrackr provides a comprehensive library of exercises, ranging from cardio and strength training to yoga and Pilates, to cater to various fitness preferences and goals."
          />
          <Card
          title="Personalized Recommendations: "
          description="FitTrackr's intelligent algorithm analyzes your workout data and provides personalized exercise recommendations to help you optimize your fitness routine and achieve better results."
          classname="lg:translate-y-12"
          />
        </div>
      </section>
    </main>
  );
}
