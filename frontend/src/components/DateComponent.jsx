import React from 'react'

const DateComponent = (props) => {
  
  function getNewDateString(date) {
    console.log(date)
    const dateArr = date.toString().split(" ")
    let newDateString = dateArr[1] +" " + dateArr[2]+ " at " +dateArr[4]
    return newDateString
  }
  return (
    <div>
      <p>{getNewDateString(props.props)}</p>
    </div>
  )
}

export default DateComponent