'use client'

import { useState } from 'react';
import axios from 'axios';

interface Exercise {
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
}

const Form = () => {
  const [exercise, setExercise] = useState<Exercise>({
    name: '',
    bodyPart: '',
    equipment: '',
    gifUrl: '',
    target: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/updateRoutine', exercise);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExercise((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={exercise.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="bodyPart">Body Part:</label>
        <input
          type="text"
          id="bodyPart"
          name="bodyPart"
          value={exercise.bodyPart}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="equipment">Equipment:</label>
        <input
          type="text"
          id="equipment"
          name="equipment"
          value={exercise.equipment}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gifUrl">GIF URL:</label>
        <input
          type="text"
          id="gifUrl"
          name="gifUrl"
          value={exercise.gifUrl}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="target">Target:</label>
        <input
          type="text"
          id="target"
          name="target"
          value={exercise.target}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;