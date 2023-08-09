// import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Overview() {
  const [loginsOvertime, setloginsOvertime] = useState([
    {
      time: "00:00",
      logins: 0,
    },
    {
      time: "01:00",
      logins: 0,
    },
    {
      time: "02:00",
      logins: 0,
    },
    {
      time: "03:00",
      logins: 0,
    },
    {
      time: "04:00",
      logins: 0,
    },
    {
      time: "05:00",
      logins: 0,
    },
    {
      time: "06:00",
      logins: 0,
    },
    {
      time: "07:00",
      logins: 0,
    },
    {
      time: "08:00",
      logins: 0,
    },
    {
      time: "09:00",
      logins: 0,
    },
    {
      time: "10:00",
      logins: 0,
    },
    {
      time: "11:00",
      logins: 0,
    },
    {
      time: "12:00",
      logins: 0,
    },
    {
      time: "13:00",
      logins: 0,
    },
    {
      time: "14:00",
      logins: 0,
    },
    {
      time: "15:00",
      logins: 0,
    },
    {
      time: "16:00",
      logins: 0,
    },
    {
      time: "17:00",
      logins: 0,
    },
    {
      time: "18:00",
      logins: 0,
    },
    {
      time: "19:00",
      logins: 0,
    },
    {
      time: "20:00",
      logins: 0,
    },
    {
      time: "21:00",
      logins: 0,
    },
    {
      time: "22:00",
      logins: 0,
    },
    {
      time: "23:00",
      logins: 0,
    },
    {
      time: "12:00",
      logins: 0,
    },
  ]);

  const getDataFromServer = async () => {
    const { data } = await axios.get("http://localhost:3031/overview");

    for (let i = 0; i < data.length; i++) {
      for (let d = 0; d < loginsOvertime.length; d++) {
        if (`${data[i]}:00` === loginsOvertime[d].time) {
          loginsOvertime[d].logins++;
        }
      }
      setloginsOvertime(loginsOvertime);
      console.log(loginsOvertime);
    }
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  return (
    <AreaChart
      width={1000}
      height={400}
      data={loginsOvertime}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="logins" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
}
