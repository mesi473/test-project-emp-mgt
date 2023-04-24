import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' 
    },
    title: {
      display: true,
      text: 'Gross Sallary with age of the employee',
    },
  },
};



export default function LineGraph({employees}) {
    const labels = employees.map((item)=>item.age);

const data = {
  labels,
  datasets: [
    {
      label: 'Gross Sallary',
      data: employees.map((item) => item.grossSallary),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};
  return <Line  options={options} data={data} />;
}
