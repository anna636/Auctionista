import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuctionItem } from "../contexts/AuctionItemContext";

const BidContext = createContext();

export const useBidContext = () => {
  return useContext(BidContext);
};


const BidProvider = (props) => {

  const [bids, setBids] = useState([])
  const { fetchItemsInBatch, auctionItems } = useAuctionItem();

  useEffect(() => {
      fetchAllBids()
      }, []);
   
  const fetchAllBids = async () => {
    try {
      let response = await fetch("/rest/bids")
      if (response.status == 200) {
        setBids(await response.json())
      }
      else {
        console.log("Fetching bids failed")
      }
    } catch {
      console.log("")
    }
  };

  const fetchBid = async (id) => {
    let res = await fetch("/rest/bids/" + id)
    try {
      let fetchedItem = await res.json()
      console.log("From fetchBid: ", fetchedItem)
      return fetchedItem;
    }
    catch {
      console.log("No item found")
    }
  }

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
      console.log(await response.json())
     // fetchItemsInBatch(auctionItems.length)
      return response
    } catch {
      console.log("Posting bid failed")
      return null;
    }
   
  }

  const values = {
    postNewBid,
    bids,
    fetchAllBids,
    fetchBid
  };

  return (
    <BidContext.Provider value={values}>
      {props.children}
    </BidContext.Provider>
  );
};

export default BidProvider;
