import React, { useContext, useEffect, useState } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";
import { useBidContext } from "../contexts/BidContext";
import { useAuctionItem } from "../contexts/AuctionItemContext";
import CustomModal from "../components/CustomModal";
import Confetti from "react-confetti";

function Notifications() {
  const { currentUser } = useContext(UserContext);
  const { isConnected } = useSocketContext();
  const { fetchBidsByUserId } = useBidContext();
  const { updateAuctionItem, fetchAuctionItem } = useAuctionItem();
  const [myProp, setMyProp] = useState({});
  const [wonItems, setWonItems] = useState([]);
  const [enableConfetti, setEnableConfetti] = useState(false);

  useEffect(() => {
    if (isConnected && currentUser) {
      checkForWonItems();
    }
    return () => {
      setEnableConfetti(false)
    };
  }, [isConnected, currentUser]);

  const checkForWonItems = async () => {
    console.log("Checking for won items");
    let auctionItems = await getAndSortBidsAndItems();
    console.log("auctionitems ", auctionItems);
    if (auctionItems && auctionItems.length > 0) {
      setWonItems(auctionItems);
      auctionItems.map((item) => {
        openModal(item)
      })
      setEnableConfetti(true);

    }
  };

  const getAndSortBidsAndItems = async () => {
    let bids = await fetchBidsByUserId(currentUser.id);
    if (bids && bids.length) {
      let auctionItemsWithDuplicates = [];
      for (let bid of bids) {
        auctionItemsWithDuplicates.push(bid.auctionItem);
      }

      let noDuplicates = await removeDuplicates(auctionItemsWithDuplicates);
      let checkedLastBid = checkLastBid(noDuplicates);
      console.log("checked last bid: ", checkedLastBid);
      if (checkedLastBid.length > 0) {
        let checkedDeadline = checkDeadline(checkedLastBid);
        console.log("Checked deadline: ", checkedDeadline);
        if (checkedDeadline.length > 0) {
          let checkedReservationPrice =
            checkReservationPriceAndSetSold(checkedDeadline);
          console.log(checkedReservationPrice);
          return checkedReservationPrice;

          //****CHECK FOR NOTIFICATION SEEN */
        }
      }
    }
  };

  function checkLastBid(auctionItems) {
    let lastBidCheckedAuctionItems = [];
    for (let item of auctionItems) {
      if (item.bids[item.bids.length - 1].user_id == currentUser.id) {
        lastBidCheckedAuctionItems.push(item);
      }
    }
    return lastBidCheckedAuctionItems;
  }

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

  async function checkReservationPriceAndSetSold(auctionItems) {
    let reservationPriceReached = [];

    if (auctionItems && auctionItems.length) {
      for (let item of auctionItems) {
        if (item.bids && item.bids.length) {
          if (item.reservationPrice <= item.bids[item.bids.length - 1].amount) {
            reservationPriceReached.push(item);
            let auctionItemObject = {
              sold: true,
            };
            let returnedItem = await updateAuctionItem(
              item.id,
              auctionItemObject
            );
            console.log("returned ", returnedItem);
          }
        }
      }
    }
    return reservationPriceReached;
  }

  async function removeDuplicates(arrayWithDuplicates) {
    // Using IDs because each bid item is unique
    let arrayWithDuplicatesIDs = [];
    arrayWithDuplicates.map((item) => arrayWithDuplicatesIDs.push(item.id));
    // Converting into Set and back again removes duplicates
    let cleanArrayIDs = [...new Set(arrayWithDuplicatesIDs)];
    let cleanArray = [];

    for (let id of cleanArrayIDs) {
      let auctionItem = await fetchAuctionItem(id);
      // arrayWithDuplicates.find((item) => item.id === id);
      cleanArray.push(auctionItem);
    }
    return cleanArray;
  }

  function openModal(auctionItem) {
    setMyProp({
      show: true,
      colour: "green",
      header: "Congratulations!!",
      text: "You have won the following auction: ",
      auctionItem: auctionItem,
    });
  }

  const pull_data = async (data) => {
    // let auctionItemObject = {
    //   sold: true,
    // };
    // let returnedItem = await updateAuctionItem(item.id, auctionItemObject);
    // console.log("returned ", returnedItem);

    setMyProp({
      show: false,
    });
  };

  return (
    <div style={styles.box}>
      {enableConfetti &&
          <div className="wonContainer">
            <CustomModal prop={myProp} func={pull_data} />
            <Confetti opacity="0.7" numberOfPieces="700" recycle={false} />
          </div>
        }
    </div>
  );
}

export default Notifications;

const styles = {
  box: {
    position: "absolute",
  },

  // add display none
};
