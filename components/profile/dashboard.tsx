"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Workouts per week",
      color: "#FAFAFA",
      fontSize: "20px",
    },
    labels: {
      fontColor: "#FAFAFA",
      color: "#FAFAFA",
      font: {
        color: "#FAFAFA",
      },
    },
  },
};

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const data = {
  labels,
  datasets: [
    {
      // label: 'Horas',
      display: false,
      data: [2, 10, 11, 12, 15, 14, 18],
      backgroundColor: "#E6D5B8",
    },
  ],
};

export default function Dashboard() {
  return (
    <Bar
      options={options}
      data={data}
      className="w-full rounded border-[1px] p-1"
    />
  );
}
