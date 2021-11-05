import React, {useState, useEffect} from 'react'
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function PaymentModal(props) {
  const [cv, setCV] = useState(0)
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(0)
  const [number, setNumber] = useState(0)
  const [failed, setFailed]=useState(false)
  


  function pay(e) {
    
    e.preventDefault()
    if (cv === 0 || month === 0 || year === 0 || number === 0 || month.toString().length > 2 || year.toString().length > 2) {
      console.log("wrong info")
      setFailed(true)
       setTimeout(function () {
         setFailed(false);
       }, 3000);
    
    }
    else {
      props.func(true);
    }
     
      
    }
 
  
  return (
    <Modal show={props.modal} onHide={props.toggle} className="bootstrapModal">
      <Modal.Header closeButton>
        <Modal.Title>Payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="cardNumber" style={styles.cardNumber}>
          <label htmlFor="">Card number</label>
          <input
            type="number"
            required
            style={styles.inputNumber}
            
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="cardInfo" style={styles.cardInfo}>
          <div>
            <label htmlFor="">Expiry date</label>
            <input
              type="number"
              required
              style={styles.inputMonth}
              placeholder="MM"
             
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="" style={styles.hide}>
              Year
            </label>
            <input
              type="number"
              required
              style={styles.inputYear}
              placeholder="YY"
           
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">CV code</label>
            <input
              type="number"
              required
              style={styles.inputCV}
             
              onChange={(e) => setCV(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <div className="finalPayment" style={styles.finalPayment}>
        <p>Final payment: </p>
        <div className="paymentAmount" style={styles.paymentAmount}>
          <p style={styles.amount}>{props.payment} euro</p>
        </div>
      </div>
      <Modal.Footer>
        <button className="payBtn" style={styles.payBtn} onClick={pay}>
          Pay
        </button>
        <div className="warning" style={failed ? styles.warning : styles.hide}> <p>Wrong information</p></div>
      </Modal.Footer>
    </Modal>
  );
}

export default PaymentModal

const styles = {
  cardNumber: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "5vh",
  },
  inputNumber: {
    width: "20vw",
    border: "1px solid #ccc",
    padding: "1vh",
    borderRadius: "5px",
  },

  cardInfo: {
    display: "flex",
    flexDirection: "row",
    gap: "1vw",
  },

  inputMonth: {
    width: "8vw",
    border: "1px solid #ccc",
    padding: "1vh",
    borderRadius: "5px",
  },
  inputYear: {
    width: "5vw",
    border: "1px solid #ccc",
    padding: "1vh",
    borderRadius: "5px",
  },
  hide: {
    color: "white",
  },
  finalPayment: {
    paddingTop: "1vh",
    paddingLeft: "2vw",
    display: "grid",
    gridTemplateColumns: "70% 30%",
    backgroundColor: "#428bca",
    borderRadius: "5px",
    margin: "0px 20px 10px 20px",
    height: "7vh",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },

  payBtn: {
    width: "100%",
    backgroundColor: "#5cb85c",
    padding: "10px 16px",
    fontSize: "18px",
    lineHeight: "1.33",
    borderRadius: "6px",
    color: "white",
    border: "none",
  },

  paymentAmount: {
    color: "#428bca",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "8vw",
    height: "3vh",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  amount: {
    marginTop: "2vh",
  },

  inputCV: {
    border: "1px solid #ccc",
    padding: "1vh",
    borderRadius: "5px",
  },

  warning: {
    backgroundColor: "red",
    color: "white",
    width: "100%",
    height: "4vh",
    textAlign:"center"
  }
};