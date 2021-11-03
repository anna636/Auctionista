import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Counter from "./Counter";
import QuickBid from "./QuickBid";
import { useAuctionItem } from "../contexts/AuctionItemContext";


const AuctionItemCard = (props) => {

   const location = useLocation(); 
  const history = useHistory();
  const { fetchAuctionItem } = useAuctionItem()
  const [item, setItem] = useState({})
 
  
  useEffect( async () => {
    let auctionItem = await fetchAuctionItem(props.props.id)
    setItem(auctionItem);
  }, []);
  
  

   
  function redirect() {
    history.push("/details/" + props.props.id)
    window.scrollTo(0, 0);
  }

  return (
    <div className="itemWrapper" style={styles.itemWrapper}>
      <div className="mainInfo" style={styles.mainInfo}>
        <div style={styles.textContainer}>
          {props.props.bids.length > 0 ? (
            <p>
              Latest bid:{" "}
              <strong>
                {props.props.bids[props.props.bids.length - 1].amount}
              </strong>
              <i class="bi bi-currency-bitcoin"></i>
            </p>
          ) : (
            <p>
              Current price: <strong>{item.startPrice}</strong>
              <i class="bi bi-currency-bitcoin"></i>
            </p>
          )}
          <p>
            Minimum bid: <strong>{item.minimumBid}</strong>
            <i class="bi bi-currency-bitcoin"></i>{" "}
          </p>
          {location.pathname === "/" ? <QuickBid props={props.props} /> : null}
          <div style={styles.counter}>
            <Counter dateFrom={props.props.deadline}></Counter>
          </div>
        </div>
        <div style={styles.imageContainer}>
          <img
            style={styles.img}
            src={props.props.images.split(",")[props.props.primaryImgIndex]}
            alt=""
            onClick={redirect}
          />
        </div>
      </div>
      <div className="title" style={styles.title}>
        <h5 style={{ marginBottom: "0" }}>{props.props.title}</h5>
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
    padding: "2rem",
    boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.54)",
    borderRadius: "20px",
    border: "solid 1px black",
    color: "black",
    backgroundColor: "#ced2b3",
  },
  mainInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
  },
  imageContainer: {
    height: "12rem",
    width: "60%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
  },
  // img: {
  //   width: "50%",
  //   cursor: "pointer",
  //   maxHeight: "152px",
  //   borderRadius: "5px",
  //   marginRight: "1rem",
  // },
  title: {
    textAlign: "center",
    paddingTop: "3vh",
    fontFamily: "Montserrat, sans-serif",
  },

  btn: {
    border: "none",
    borderRadius: "5px",
    padding: "0.5vw",
  },

  hover: {
    color: "white",
  },
  counter: {
    marginTop: "15px",
  },
  textContainer: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "14px",
  },
};