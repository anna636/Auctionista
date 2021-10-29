import React, { useState, useEffect } from "react";

function formatTime(time){
  return new Date(time);
}

function calcDiffInMinutes(dateA, dateB) {
  //dateA = deadline
  //dateB = currentTime
  if (dateA >= dateB) {
    return;
  } else {
    let fullCounter = null;
    dateB.setSeconds(dateB.getSeconds() + 40);
    const total = Date.parse(dateA) - dateB;
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor(4 + (total / 1000 / 60) % 60);
    const hours = Math.floor(3 + (total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(2 + total / (1000 * 60 * 60 * 24));
    if (days < 0) {
      fullCounter = ' ' + Math.abs(days) + ' days remaining'
      return fullCounter;
    }
    else {
      
      fullCounter = ' ' + Math.abs(hours) + ' : ' + Math.abs(minutes) + ' : ' + Math.abs(seconds);
      return fullCounter;
    }
    console.log(days)
  }
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