import React from "react";
import { createContext, useContext, useState, useEffect } from "react";


const BidContext = createContext()

export const useBid = () => {
  return useContext(BidContext);
}

const BidProvider = (props) => {
  
  const placeQuickBid = async (bid) => {
    let res = await fetch("/rest/bids", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bid)
    })

    console.log("placed quick bid",await res.json())
    
    return res
  }

  const values = {
    placeQuickBid,
  };


  return (
    <BidContext.Provider value={values}>
      {props.children}
    </BidContext.Provider>
  );
};

export default BidProvider;