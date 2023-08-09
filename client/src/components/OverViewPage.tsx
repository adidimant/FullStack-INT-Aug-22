import React, { useEffect, useState } from 'react'
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS , CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from "chart.js/auto";
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
//   );
import axios from 'axios';
import GraphComponent from './GraphComponent';



function OverViewPage() {
    const [LineStatistic,SetLineStatistic] = useState({
        labels: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
        ],
        datasets: [
          {
            label: "מספר כניסות",
            data: [],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      })
      

      useEffect(() => {
        async function GetGraphData(){
            try {
                // debugger;
                const {data} :any = await axios.get('http://localhost:3031/GetGraphData',{withCredentials:true})
                console.log(data);
                SetLineStatistic({
                    labels:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
                    datasets: [
                      {
                        label: "logins",
                        data: data,
                        borderColor: "black",
                        borderWidth: 2,
                      },
                    ],
                  });
            } catch (error) {
                console.log(error);

            }
        }
      GetGraphData();
      }, [])

  return (
    <div>
        <h1>logins over time:</h1>
          <GraphComponent LineStatistic={LineStatistic}/>

        {/* <Bar data={LineStatistic}

        /> */}
    </div>
  )
}

export default OverViewPage