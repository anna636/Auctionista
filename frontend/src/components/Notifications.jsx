import React, { useContext, useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { useBidContext } from "../contexts/BidContext"

function Notifications() {
  const { currentUser } = useContext(UserContext);
  const { isConnected } = useSocketContext();
  const { fetchBidsByUserId } = useBidContext();

  useEffect(() => {
    console.log(isConnected);
    if (isConnected && currentUser) {
      checkForWonItems();
    }
  }, [isConnected, currentUser]);

  const checkForWonItems = async () => {
    console.log("Checking for won items")
    let bids = await fetchBidsByUserId(currentUser.id)
    console.log(bids)
  };

  return (
    <div style={styles.box}>
      <h2>This is a notification</h2>
    </div>
  );
}

export default Notifications;

const styles = {
  box: {
    position: "absolute",
    backgroundColor: "black",
    color: "white",
    height: "10rem",
    width: "20rem",
  },

  // add display none
};
