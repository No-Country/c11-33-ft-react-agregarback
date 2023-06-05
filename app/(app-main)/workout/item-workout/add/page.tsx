"use client";

import React, { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [exercise, setExercise] = useState("");
  const [repetitions, setRepetitions] = useState("");

  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };

  const handleDayOfWeekChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDayOfWeek(event.target.value);
  };

  const handleExerciseChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setExercise(event.target.value);
  };

  const handleRepetitionsChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setRepetitions(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Name: ", name);
    console.log("Day of week: ", dayOfWeek);
    console.log("Exercise: ", exercise);
    console.log("Repetitions: ", repetitions);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg">
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0">
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0">
          <label
            htmlFor="dayOfWeek"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Day of week
          </label>
          <div className="relative">
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              value={dayOfWeek}
              onChange={handleDayOfWeekChange}
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293,7.707c-0.391,0.391-0.391,1.023,0,1.414L10.586,12l-4.293,4.293C5.902,16.902,5.951,17,6,17s0.098-0.098,0.293-0.293l4.999-4.999c0.391-0.391,0.391-1.023,0-1.414L6.293,7.707z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 w-full px-3 md:mb-0">
        <label
          htmlFor="exercise"
          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
        >
          Exercise
        </label>
        <input
          type="text"
          id="exercise"
          name="exercise"
          value={exercise}
          onChange={handleExerciseChange}
          placeholder="Enter the exercise you will do"
          className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="mb-6 w-full px-3 md:mb-0">
        <label
          htmlFor="repetitions"
          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
        >
          Repetitions
        </label>
        <input
          type="number"
          id="repetitions"
          name="repetitions"
          value={repetitions}
          onChange={handleRepetitionsChange}
          placeholder="Enter the number of repetitions"
          className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;
