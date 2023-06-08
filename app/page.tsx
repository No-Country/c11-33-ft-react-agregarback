import React from "react";
import Image from "next/image";
import Card from "@/components/home/card";

export default async function Home() {
  return (
    <main className="z-10 bg-primary-400">
     <section className="hero">
        <div className="container gap-8 px-4 md:grid md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl font-semibold text-accent-600 md:text-5xl">
              FitTrackr Your Ultimate Workout Logger
            </h1>
            <p className="text-base leading-8 text-neutral-400 md:text-xl">
              Track your fitness journey with ease. FitTrackr is the ultimate
              workout logger for staying organized, motivated, and reaching your
              goals.
            </p>
            <div className="mt-8">
              <span className="text-3xl font-semibold text-accent-600">
                5,910+
              </span>
              <p className="max-w-[25ch] text-base leading-8 text-neutral-400">
                Customers are using & it’s growing everyday
              </p>
            </div>
          </div>
          <Image
            className="mt-8 w-full max-w-[377px] rounded md:col-start-1 md:row-start-1"
            src="/assets/hero.png"
            alt="hero-image"
            width={1200}
            height={800}
          />
        </div>
      </section>

      <section className="mt-20 px-4">
        <div className="container grid items-center px-4">
          <span className="text-center text-base text-neutral-100 lg:text-xl">
            Say hello to FitTrackr
          </span>
          <h2 className="mt-8 text-center text-2xl font-semibold text-accent-600 lg:text-4xl">
            Unlimited Options give you the ultimate flexibility
          </h2>
        </div>
        <div className="mt-8 grid place-items-center gap-16 lg:grid-cols-2 lg:gap-0 lg:gap-y-8">
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
