import React, { useEffect, useState } from 'react'
import Bargraph from './Bargraph';
import axios from 'axios';


function Overview() {
    const [statisticData, setStatisticData] = useState({
        labels:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00'],
        datasets: [
          {
            label: "logins",
            data: [],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });

      useEffect(() => {
    
        async function GetGraphData(){
            try {
                const {data} :any = await axios.get('http://localhost:3031/GetGraphData',{withCredentials:true})
                console.log(data);
                setStatisticData({
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
    <div style={{width:'80%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h1 style={{textAlign:'center'}}>Number of logins per hour</h1>
        <Bargraph Data={statisticData}/>
    </div>
  )
}

export default Overview