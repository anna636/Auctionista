import React, { useContext, useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { useBidContext } from "../contexts/BidContext";

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
    console.log("Checking for won items");
    let auctionItems = await getAndSortBidsAndItems();

    // ***CONTINUE with logic on how an item is won by user, deadline check, reservationPrice check
  };

  const getAndSortBidsAndItems = async () => {
    let bids = await fetchBidsByUserId(currentUser.id);
    console.log(bids);
    if (bids && bids.length) {
      let auctionItemsWithDuplicates = []
      for (let bid of bids) {
        // CHANGE FALSE TO TRUE AFTER TESTING *************
        if (bid.auctionItem.sold === false)
        {
          auctionItemsWithDuplicates.push(bid.auctionItem)
        }
      }     
      let auctionItems = removeDuplicates(auctionItemsWithDuplicates)
      return auctionItems
    }

  };

  function removeDuplicates(arrayWithDuplicates) {
    // Using IDs because each bid item is unique
    let arrayWithDuplicatesIDs = [];
    arrayWithDuplicates.map((item) =>
      arrayWithDuplicatesIDs.push(item.id)
    );
    // Converting into Set and back again removes duplicates
    let cleanArrayIDs = [...new Set(arrayWithDuplicatesIDs)];
    let cleanArray = [];

    for (let id of cleanArrayIDs) {
      let auctionItem = arrayWithDuplicates.find(
        (item) => item.id === id
      );
      cleanArray.push(auctionItem);
    }
    console.log(cleanArray);
    return cleanArray;
  }



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
