import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";




const AuctionItemCard = (props) => {
  const history = useHistory();
  
  function redirect() {
    history.push("/details/"+ props.props.id)
  }

  return (
    <div className="itemWrapper" style={styles.itemWrapper} onClick={redirect} >
      <div className="mainInfo" style={styles.mainInfo}>
        <div>
          {props.props.bids.length > 0 ? (
            <p>Latest bid: {props.props.bids[0].currentBid} euro</p>
          ) : (
            <p>There are no bids on this item yet</p>
          )}
          <p>
            Minimum bid possible: {props.props.minimumBid} euro{" "}
          </p>
          

          <button className="quickBid" style={styles.btn}>
            Place quick bid
          </button>
        </div>
        <img
          style={styles.img}
          src="https://us.123rf.com/450wm/khmel/khmel1611/khmel161100006/67107397-three-budgies-are-in-the-roost.jpg?ver=6"
          alt=""
        />
      </div>
      <div className="title" style={styles.title}>
        <h5>{props.props.title}</h5>
      </div>
    </div>
  );

}


export default AuctionItemCard;

const styles = {
  itemWrapper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10vh",
    padding: "5vh",
    boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.54)",
    borderRadius: "20px",
    cursor:"pointer"
  },
  mainInfo: {
    display: "flex",
    flexDirection: "row",
    gap: "5vw",
  },
  img: {
    width: "50%",
  },
  title: {
    textAlign: "center",
    paddingTop: "1vh",
  },

  btn: {
    border: "none",
    borderRadius: "5px",
    padding: "0.5vw"
    
  },

  hover: {
    color:"white"
  }


};