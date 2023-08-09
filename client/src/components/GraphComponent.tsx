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
function GraphComponent({LineStatistic}:{LineStatistic:any}) {
  return (
    <div>
               <Bar data={LineStatistic}
                   //  this is the option to styiling the Bar chart we can see the options in the documinatation 
           // options={}
        />
    </div>
  )
}

export default GraphComponent