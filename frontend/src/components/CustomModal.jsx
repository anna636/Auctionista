import {useState} from 'react'


const CustomModal = (prop) => {

 
  
  function close() {
     prop.func(false);
  }
 
  return (
    <div style={prop.prop.show ? styles.show : styles.hide} className="customModal">
      <div className="closeModal" style={styles.closeModal}>
        <p onClick={close}>X</p>
      </div>
      <div className="mainInfo" style={styles.mainInfo}>
        <p>{prop.prop.text}</p>
      </div>

      <div className="modalFooter" style={styles.modalFooter}>
        <p>{prop.prop.footerText }</p>
      </div>
    </div>
  );
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
    height: "40vh",
    backgroundColor: "white",
    right: "35vw",
    top: "40vh",
    borderRadius: "20px",
    opacity: "0.9",
    display: "grid",
    gridTemplateRows:"20% 60% 20%",
    padding:"1vw"
    
  },
  closeModal: {
    textAlign: "right",
    cursor:"pointer"
  },
  modalFooter: {
    borderTop:"1px solid black"
  },
  mainInfo: {
    fontSize: "1.3em",
    fontWeight:"bold"
  }
}