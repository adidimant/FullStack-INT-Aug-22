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
import { curveCardinal } from "d3-shape";
import { useAuthContext } from "../../contexts/authProvider";
import axiosClient from "../../apiClient";

export default function UserOverview() {
  const [userName, setUserName] = useState("");
  const cardinal = curveCardinal.tension(0.2);
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
  ]);

  const getDataFromServer = async () => {
    const { data }: any = await axiosClient.get(
      `http://localhost:3031/UserOverview`,
      { withCredentials: true }
    );

    loginsOvertime.map((d, i) => {
      d.logins = data.numsOfLogin[i];
    });
    console.log(loginsOvertime);
    setUserName(data.username);
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  return (
    <>
      <h6>Number of logins of the user: {userName} per hour</h6>
      <AreaChart
        width={600}
        height={300}
        data={loginsOvertime}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="9 9" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="logins"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
        />
        <Area
          type={cardinal}
          dataKey="logins"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.3}
        />
      </AreaChart>
    </>
  );
}
