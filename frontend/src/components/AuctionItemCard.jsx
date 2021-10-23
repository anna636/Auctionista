import React from 'react'
import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";



const AuctionItemCard = (props) => {
  return (
    <div className="itemWrapper" style={styles.itemWrapper}>
      <div className="mainInfo" style={styles.mainInfo}>
        <div>
          {props.props.bids.length > 0 ? (
            <p>Latest bid: {props.props.bids[0].currentBid} euro</p>
          ) : (
            <p>There are no bids on this item yet</p>
          )}
          <p>Minimum bid possible: {props.props.minimumBid} euro </p>
  
          <button>Place quick bid</button>
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
    boxShadow: "5px 10px",
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
};