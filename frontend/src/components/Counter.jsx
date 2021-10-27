import React, { useState, useEffect } from "react";

function formatTime(time){
  return new Date(time);
}

function calcDiffInMinutes(dateA, dateB) {
  return Math.floor((dateB.getHours() - dateA.getHours())+(dateB.getMinutes() - dateA.getMinutes())+(dateB.getSeconds() - dateA.getSeconds())); // TODO CALCULATIONS HERE
}


export default ({ dateFrom }) => {
  let formattedTime = formatTime(dateFrom);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [minutesDiff, setMinutesDiff] = useState(
    calcDiffInMinutes(currentDate, formattedTime)
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentDate]);

  useEffect(() => {
    setMinutesDiff(calcDiffInMinutes(currentDate, formattedTime));
  }, [currentDate, formattedTime]);

  return (
    <div>
      <div>Date From: {formattedTime.toISOString()}</div>
      <div>CountDown value: {minutesDiff}</div>
    </div>
  );

};