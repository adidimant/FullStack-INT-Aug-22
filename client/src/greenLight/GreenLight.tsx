import React, { useState, useMemo, useEffect } from "react";

export default function GreenLight() {
  const [greenLight, setGreenLight] = useState(false);
  console.log(greenLight);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreenLight(true);
      setTimeout(() => {
        setGreenLight(false);
      }, 1000);
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const secondnsInDay = useMemo(() => 24 * 60 * 60, []);
  function calculatesSeconds() {
    if (greenLight === true) {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let secondsUntilEndOfDate =
        secondnsInDay - hours * 60 * 60 - minutes * 60 - seconds;
      return secondsUntilEndOfDate;
    } else return "";
  }
  const calculates = useMemo(() => calculatesSeconds(), [greenLight]);

  let color = greenLight === true ? "green" : "white";
  console.log(color);
  return (
    <>
      <div
        style={{
          backgroundColor: color,
          height: "50px",
          color: "black",
          fontSize: "200",
          textAlign: "center",
        }}
      >
        <p>
          {greenLight === true
            ? `remaining seconds for this day: ${calculates}`
            : ""}
        </p>
      </div>
    </>
  );
}
