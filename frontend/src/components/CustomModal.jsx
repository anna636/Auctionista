import {useState} from 'react'


const CustomModal = (prop) => {

 
  
  function close() {
     prop.func(false);
  }
 
  return (
    <div style={prop.prop.show ? styles.show: styles.hide}>
      <p onClick={close}>x</p>
      <p>{prop.prop.text}</p>
    </div>
  )
}

export default CustomModal

const styles = {
  hide: {
    display:"none",
  },

  show: {
    display: "block",
    position: "fixed",
    width: "30vw",
    height: "30vh",
    backgroundColor: "white",
    right: "35vw",
    top: "40vh",
    borderRadius: "20px",
    opacity:"0.9"
    
  }
}