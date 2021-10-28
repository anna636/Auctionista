import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const BidContext = createContext();

export const useBidContext = () => {
  return useContext(BidContext);
};


const BidProvider = (props) => {

  const [bids, setBids] = useState([])

  useEffect(() => {
      fetchAllBids()
      }, []);
   
  const fetchAllBids = async () => { 
    let response = await fetch("/rest/bids")
    setBids(await response.json())
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToPost),
      });
      console.log(await response.json())
      return response
    } catch {
      console.log("Posting bid failed")
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
