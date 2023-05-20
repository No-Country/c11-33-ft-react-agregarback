import { roboto } from "@/app/fonts";
import React, { useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = () => {
    const errors: {
      email?: string;
      password?: string;
    } = {};

    if (!formValues.email) {
      errors.email = "Email is required";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (errs) {
      setErrors(errs);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-8 flex max-w-sm flex-col"
    >
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <label className={`${roboto.variable} font-semibold`} htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        className="mb-4 rounded-md border-2 border-gray-300 px-4 py-2"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}
      <div className="flex justify-between">
        <label
          className={`${roboto.variable} font-semibold`}
          htmlFor="password"
        >
          Password
        </label>
        <p className='font-roboto font-semibold decoration-solid tracking-tight text-sm'>Forgot Password</p>
      </div>
      <input
        id="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
        className="rounded-md border-2 border-gray-300 px-4 py-2"
      />

      <button className="mt-4 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
        Continue
      </button>
    </form>
  );
};

export default RegisterForm;
