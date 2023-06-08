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

export default function Dashboard({
  title,
  labelsets,
  datasets,
}: {
  title: string;
  labelsets: string[];
  datasets: number[];
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: true,
        text: title,
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

  const labels = labelsets;

  const data = {
    labels,
    datasets: [
      {
        // label: 'Horas',
        display: false,
        data: datasets,
        backgroundColor: "#E6D5B8",
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={data}
      className="w-full rounded border-[1px] p-2"
    />
  );
}
