import { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Counter from "./Counter";

import { useAuctionItem } from "../contexts/AuctionItemContext";
import { UserContext } from "../contexts/UserContext";
import { useBidContext } from "../contexts/BidContext";

import BootstrapModal from "./BootstrapModal";
import PaymentModal from "./PaymentModal";


const AuctionItemCard = (props) => {

   const location = useLocation(); 
  const history = useHistory();
  const { fetchAuctionItem } = useAuctionItem()
  const [item, setItem] = useState({})
    const { getCurrentUser } = useContext(UserContext);
   const { postNewBid } = useBidContext();
   const [show, setShow] = useState(false);
   const [showPayment, setShowPayemtn] = useState(false);
   const [modalText, setModalText] = useState("");
  
  useEffect( async () => {
    let auctionItem = await fetchAuctionItem(props.props.id)
    setItem(auctionItem);
  }, []);


  async function updateItem(itemId) {
    let auctionItem = await fetchAuctionItem(itemId)
    setItem(auctionItem);
 
  }


   const toggleModal = () => {
     setShow(!show);
   };

   const toggleShowPayment = () => {
     setShowPayemtn(!showPayment);
  };
  
  async function quickBid(bool) {
    toggleShowPayment()
    if (bool) {
      if (!getCurrentUser()) {
        setModalText("Please log in");
        toggleModal();
      } else {
       
        const bidToPost = {
          amount: item.minimumBid,
          time: new Date(),
          user_id: getCurrentUser().id,
          auctionItem: item,
        };

        let res = await postNewBid(bidToPost);

        if (!res.error) {
          setModalText("You placed bid worth of " + bidToPost.amount + " euros");
        updateItem(item.id)
          toggleModal();
         
        }
      
      }
    }
  }
  
  

   
  function redirect() {
    history.push("/details/" + item.id)
    window.scrollTo(0, 0);
  }

  return (
    <div className="itemWrapper" style={styles.itemWrapper}>
      <div className="mainInfo" style={styles.mainInfo}>
        <div>
          {item.bids && item.bids.length > 0 ? (
            <p>
              Latest bid: {item.bids[item.bids.length - 1].amount}{" "}
              euro
            </p>
          ) : (
            <p>There are no bids on this item yet</p>
          )}
          <p>Minimum bid possible: {item.bids && item.bids.length > 0 ? item.minimumBid : item.startPrice} euro </p>
          {location.pathname === "/" && getCurrentUser() ? (
            <div>
              <button
                className="quickBid"
                style={styles.btn}
                onClick={toggleShowPayment}
              >
                Place quick bid
              </button>
              <BootstrapModal
                toggle={toggleModal}
                modal={show}
                text={modalText}
              />
              <PaymentModal
                toggle={toggleShowPayment}
                modal={showPayment}
                payment={props.props.minimumBid}
                func={quickBid}
              />
            </div>
          ) : null}
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
    width: "45%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "3vh",
    padding: "2rem",
    boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.54)",
    borderRadius: "20px",
    border: "solid 1px black",
    color: "black",
    backgroundColor: "white",
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