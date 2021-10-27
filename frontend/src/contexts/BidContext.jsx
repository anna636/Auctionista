import React from "react";
import { createContext, useContext, useState, useEffect } from "react";


const BidContext = createContext()

export const useBid = () => {
  return useContext(BidContext);
}

const BidProvider = (props) => {
  
  const placeQuickBid = async () => {

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