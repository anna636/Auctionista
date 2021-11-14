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
      let auctionItemsWithDuplicates = [];
      for (let bid of bids) {
        auctionItemsWithDuplicates.push(bid.auctionItem);
      }
      let noDuplicates = removeDuplicates(auctionItemsWithDuplicates);
      let checkedDeadline = checkDeadline(noDuplicates);
      let checkedReservationPrice = checkReservationPrice(checkedDeadline);

      return checkedReservationPrice;
    }
  };

  function checkDeadline(auctionItems) {
    let deadlineReachedAuctionItems = [];

    if (auctionItems && auctionItems.length) {
      for (let item of auctionItems) {
        let now = new Date();
        let itemDeadline = new Date(item.deadline);
        let minusTime = now - itemDeadline;

        if (minusTime > 0) {
          deadlineReachedAuctionItems.push(item);
        }
      }
    }
    return deadlineReachedAuctionItems;
  }

  function checkReservationPrice(auctionItems) {
    let reservationPriceReached = [];

    if (auctionItems && auctionItems.length) {
      for (let item of auctionItems) {
        if (item.bids && item.bids.length) {
          if (item.reservationPrice <= item.bids[item.bids.length - 1].amount) {
            reservationPriceReached.push(item);
          }
        }
      }
    }
    return reservationPriceReached;
  }

  function removeDuplicates(arrayWithDuplicates) {
    // Using IDs because each bid item is unique
    let arrayWithDuplicatesIDs = [];
    arrayWithDuplicates.map((item) => arrayWithDuplicatesIDs.push(item.id));
    // Converting into Set and back again removes duplicates
    let cleanArrayIDs = [...new Set(arrayWithDuplicatesIDs)];
    let cleanArray = [];

    for (let id of cleanArrayIDs) {
      let auctionItem = arrayWithDuplicates.find((item) => item.id === id);
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
