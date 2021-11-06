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


  async function updateItem(itemId) {
    let auctionItem = await fetchAuctionItem(itemId)
    setItem(auctionItem);
    console.log("updating item")
  }

  
  

   
  function redirect() {
    history.push("/details/" + props.props.id)
    window.scrollTo(0, 0);
  }

  return (
    <div className="itemWrapper" style={styles.itemWrapper}>
      <div className="mainInfo" style={styles.mainInfo}>
        <div>
          {props.props.bids.length > 0 ? (
            <p>
              Latest bid: {props.props.bids[props.props.bids.length - 1].amount}{" "}
              euro
            </p>
          ) : (
            <p>There are no bids on this item yet</p>
          )}
          <p>Minimum bid possible: {item.minimumBid} euro </p>
          {location.pathname === "/" ? (
            <QuickBid props={props.props} func={updateItem}/>
          ) : (
           null
          )}
          <div style={styles.counter}>
            <Counter dateFrom={props.props.deadline}></Counter>
          </div>
        </div>
        <img
          style={styles.img}
          src={props.props.images.split(",")[props.props.primaryImgIndex]}
          alt=""
          onClick={redirect}
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
    paddingBottom: "2vh",
    boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.54)",
    borderRadius: "20px",
    color: "black",
   
  },
  mainInfo: {
    display: "flex",
    flexDirection: "row",
    gap: "2vw",
    textAlign:"left"
  },
  img: {
    width: "50%",
    cursor: "pointer",
    maxHeight:"152px"
  },
  title: {
    textAlign: "center",
    paddingTop: "3vh",
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
    marginTop: "15px"
  }
};