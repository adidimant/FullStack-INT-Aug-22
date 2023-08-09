import axios from "axios";
import { log } from "console";
import React, { useEffect, useState } from "react";
// import "./styles.css";
import { BarChart, Bar } from "recharts";

//     name: "00",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400
//   },
//   {
//     name: "01",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210
//   },
//   {
//     name: "02",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290
//   },
//   {
//     name: "03",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000
//   },
//   {
//     name: "04",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181
//   },
//   {
//     name: "05",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500
//   },
//   {
//     name: "06",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   },
//   {
//     name: "07",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   },
//   {
//     name: "08",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   },
//   {
//     name: "09",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   }
// ];

export default function Overview() {
    const[perHour,setPerHour]=useState(0);
  const [data, setData] = useState([
    {
      name: "00",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "01",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "02",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "03",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "04",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "05",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "06",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "07",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "08",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "09",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
        name: "10",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "11",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "12",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "13",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "14",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "15",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "16",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "17",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "18",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "19",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "20",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "21",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "22",
        uv: 0,
        pv: 0,
        amt: 0,
      },
      {
        name: "23",
        uv: 0,
        pv: 0,
        amt: 0,
      }
  ]);
  const [graph, setGraph] = useState<number[]>([]);
  
  
  async function getGraph() {
    const response = await axios.get("http://localhost:3031/chart");
    setGraph(response.data);
  }
  useEffect(() => {
    console.log("first")
   
    getGraph();
    for(let i=0; i<data.length; i++){
         console.log(data[i].uv);
        for(let j=0; j<graph.length; j++){
            if( Number(data[i].name) == graph[j]){
             setData(  [ {
                name: data[i].name,
                uv: 500,
                pv: 0,
                amt: 0,
              }]);
            console.log(data[i].uv  +500);
        } 
        }
      }
      
  }, []);
  return (
    <div>
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
      <h2 className="text-center">
        {graph ? (
          graph.map((hour, index) => {
            return <p key={index}>{hour}</p>;
          })
        ) : (
          <p>no one wants to visit</p>
        )}
      </h2>
    </div>
  );
}
