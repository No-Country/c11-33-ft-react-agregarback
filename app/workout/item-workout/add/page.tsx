'use client'

import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [name, setName] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [exercise, setExercise] = useState('');
  const [repetitions, setRepetitions] = useState('');

  const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleDayOfWeekChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDayOfWeek(event.target.value);
  };

  const handleExerciseChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setExercise(event.target.value);
  };

  const handleRepetitionsChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setRepetitions(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const objetform = {
      name,
      dayOfWeek,
      exercise,
      repetitions
    };

    axios.post("/api/updateRoutine", objetform)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

  };

  return (
    <div className="z-10 flex">
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <h1 className='text-xl font-variant'>Update Exercises</h1>
              <label htmlFor="name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label htmlFor="dayOfWeek" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Day of week
              </label>
              <div className="relative">
                <select
                  id="dayOfWeek"
                  name="dayOfWeek"
                  value={dayOfWeek}
                  onChange={handleDayOfWeekChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                    className="fill-current h-4 w-4"
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
          <div className="w-full px-3 mb-6 md:mb-0">
            <label htmlFor="exercise" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Exercise
            </label>
            <input
              type="text"
              id="exercise"
              name="exercise"
              value={exercise}
              onChange={handleExerciseChange}
              placeholder="Enter the exercise you will do"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label htmlFor="repetitions" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Repetitions
            </label>
            <input
              type="number"
              id="repetitions"
              name="repetitions"
              value={repetitions}
              onChange={handleRepetitionsChange}
              placeholder="Enter the number of repetitions"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  );
}

export default Form;