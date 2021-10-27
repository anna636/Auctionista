import React, { useContext, useState } from "react";
import { useBid } from '../contexts/BidContext';
import { Login } from "../components/Login";
import { UserContext, } from "../contexts/UserContext";
import CustomModal from "./CustomModal";
import BootstrapModal from "./BootstrapModal";



function QuickBid(props) {

  const { placeQuickBid } = useBid()
  const { getCurrentUser } = useContext(UserContext);
    const [show, setShow] = useState(false);
   const toggleModal = () => setShow(!show);

  function quickBid(e) {
    e.preventDefault()
    
    
    if (!getCurrentUser()) {
      
       toggleModal();
    }
    else {
      const bidToPost = {
        currentBid: props.props.minimumBid,
        time: new Date(),
        user_id: getCurrentUser().id,
        auctionItem: props.props
      };

      placeQuickBid(bidToPost);
    }
    
  }
  


  return (
    <div>
      <button className="quickBid" style={styles.btn} onClick={quickBid}>
        Place quick bid
      </button>
      <BootstrapModal toggle={toggleModal} modal={show} text={"Please log in" }/>
    </div>
  );
}

export default QuickBid
const styles = {
  btn: {
    border: "none",
    borderRadius: "5px",
    padding: "0.5vw",
  },
};