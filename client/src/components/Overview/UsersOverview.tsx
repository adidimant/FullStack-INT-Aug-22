import { useState, useEffect } from "react";
import axiosClient from "../../apiClient";
import Bargraph from "./Bargraph";

export default function UsersOverview() {
  const [statisticData, setStatisticData] = useState([]);

  useEffect(() => {
    async function GetGraphData() {
      try {
        const { data }: any = await axiosClient.get(
          "http://localhost:3031/UsersOverview",
          { withCredentials: true }
        );
        console.log(data);
        setStatisticData(data);
      } catch (error) {
        console.log(error);
      }
    }
    GetGraphData();
  }, []);

  return (
    <div
      style={{
        width: "600px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "40px",
      }}
    >
      <h6 style={{ textAlign: "center" }}>Number of users logins per hour</h6>
      <Bargraph
        Data={{
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
              label: "logins",
              data: statisticData,
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        }}
      />
    </div>
  );
}
