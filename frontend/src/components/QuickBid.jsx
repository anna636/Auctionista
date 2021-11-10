import React, { useContext, useState } from "react";
import { useBidContext } from "../contexts/BidContext";
import { UserContext } from "../contexts/UserContext";
import BootstrapModal from "./BootstrapModal";
import { updateItem } from "../components/chat/Socket";

function QuickBid(props) {
  const { getCurrentUser } = useContext(UserContext);
  const { postNewBid } = useBidContext();
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState("");
  let pageReload = false;
 

  const toggleModal = () => {
    if (show) {
      window.location.reload();
    }

    setShow(!show);
  };

  async function quickBid(e) {
    e.preventDefault();

    if (!getCurrentUser()) {
      setModalText("Please log in");
      toggleModal();
    } else {
      const bidToPost = {
        amount: props.props.minimumBid,
        time: new Date(),
        user_id: getCurrentUser().id,
        auctionItem: props.props,
      };

      //let res = await postNewBid(bidToPost);
       let msg = {
         fromLogin: getCurrentUser().username, //Who sends msg
         message: props.props.id, //text of msg
       };
      await updateItem(msg)

    /*   if (res.status === 200) {
        setModalText("You placed bid worth of " + bidToPost.amount + " euros");
        toggleModal();
        if (pageReload) {
          console.log(pageReload);
          window.location.reload(false);
        }
      }*/
    } 
  }

  return (
    <>
     {  getCurrentUser() && props.props.owner.id === getCurrentUser().id ? (
        null
      ) : (<div>
          <button className="quickBid" style={styles.btn} onClick={quickBid}>
            Place quick bid
          </button>
          <BootstrapModal toggle={toggleModal} modal={show} text={modalText} />
        </div>)}
    </>
  );
}

export default QuickBid;
const styles = {
  btn: {
    border: "none",
    borderRadius: "5px",
    padding: "0.5vw",
  },
};
