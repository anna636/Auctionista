import React, { createContext, useContext, useState, useEffect } from "react";

const BidContext = createContext();

export const useBidContext = () => {
  return useContext(BidContext);
};

const BidProvider = (props) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetchAllBids();
  }, []);


  const fetchBidsByUserId = async (userId) => {
    try {
      let res = await fetch("/rest/bids/user-id/" + userId);
      if (res.status === 200) {
        let bids = await res.json()
        return bids
      }
      else {
        console.log("Fetching bids failed")
      }
    } catch {
      console.log("Fetching bids failed")
    }
  }

  const fetchAllBids = async () => {
    try {
      let response = await fetch("/rest/bids");
      if (response.status === 200) {
        setBids(await response.json());
      } else {
        console.log("Fetching bids failed");
      }
    } catch {
      console.log("Fetching bids failed");
    }
  };

  const fetchBid = async (id) => {
    let res = await fetch("/rest/bids/" + id);
    try {
      let fetchedItem = await res.json();
      console.log("From fetchBid: ", fetchedItem);
      return fetchedItem;
    } catch {
      console.log("No item found");
    }
  };

  const postNewBid = async (itemToPost) => {
    try {
      let response = await fetch("/rest/bids", {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(itemToPost),
      });
      console.log(await response.json());
      // fetchItemsInBatch(auctionItems.length)
      return response;
    } catch {
      console.log("Posting bid failed");
      return null;
    }
  };

  const values = {
    postNewBid,
    bids,
    fetchAllBids,
    fetchBid,
    fetchBidsByUserId,
  };

  return (
    <BidContext.Provider value={values}>{props.children}</BidContext.Provider>
  );
};

export default BidProvider;
