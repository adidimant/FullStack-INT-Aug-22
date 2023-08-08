import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS , CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from "chart.js/auto";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Bargraph({Data}:any) {
  return (
    
    <Bar data={Data}/>
  )
}

export default Bargraph